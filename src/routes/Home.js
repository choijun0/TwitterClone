import React, {useState, useEffect} from "react";
import {addDocumentToCollection, getDataFromCollection, watchDataBase} from "fbase";
import Nweet from "components/Nweet"

export const TWEET = "tweets";

const Home=({user}) => {
  const [nweet, setNweet] = useState("");
  const [nweetData, setNweetData] = useState([]);
  const updateData = ({docs}) => {
    const updatedData = docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }))
    setNweetData(updatedData);
  }
  useEffect(()=>{
    watchDataBase(TWEET, updateData);
  }
  ,[]);
  const onSubmit = async (event, collection) => {
    event.preventDefault();
    const dataForm = { 
      text : nweet, 
      createdAt: Date.now(), 
      creatorId : user.uid 
      };
    await addDocumentToCollection(collection, dataForm).then(
      (resolve) => console.log(resolve) 
    ).catch(
      (e) => console.log(e.message)
    ).finally(()=> setNweet(""))
  }
  const onChange = ({target: {value}}) => {
    setNweet(value);
  };
	return <>
    <form onSubmit={event => onSubmit(event, TWEET)}>
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="submit" value="Nweet" />
   </form>
   <div>
        {nweetData.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === user.uid}
          />
        ))}
      </div>
  </>
}

export default Home;