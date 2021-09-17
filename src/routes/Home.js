import React, {useState, useEffect} from "react";
import {addDocumentToCollection, getDataFromCollection} from "fbase";

const TWEET = "tweets";



const Home=() => {
  const [nweet, setNweet] = useState("");
  const [nweetData, setNweetData] = useState([]);
  const getData = async ()=>{
    const querySnapshot = await getDataFromCollection(TWEET);
    querySnapshot.forEach(doc => {
      const dataForm = {
        ...doc.data(),
        id : doc.id
      };
      console.log(dataForm);
      setNweetData(prev => [dataForm, ...prev]);
    })
  } 
  useEffect(()=>{
    getData();
  }
  ,[]);
  const onSubmit = async (event, collection) => {
    event.preventDefault();
    const dataForm = { comment : nweet, createdAt: Date.now() };
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
          <div key={nweet.id}>
            <h4>{nweet.comment}</h4>
          </div>
        ))}
      </div>
  </>
}

export default Home;