import React, {useState, useEffect} from "react";
import {v4 as uuid} from "uuid";
import {
addDocumentToCollection, 
getDataFromCollection, 
watchDataBase,
uploadStringData,
getDownloadUrlFromStorage
} from "fbase";
import Nweet from "components/Nweet"

export const TWEET = "tweets";

const Home=({user}) => {
  const [nweet, setNweet] = useState("");
  const [nweetData, setNweetData] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
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
    //#.1 image
    let photoDownloadUrl = "";
    if(imageSrc){
      const path = `${user.uid}/photo/${uuid()}`;
      await uploadStringData(path, imageSrc).then(()=> getDownloadUrlFromStorage(path, url => photoDownloadUrl = url))
    }
    const dataForm = { 
      text : nweet, 
      createdAt: Date.now(), 
      creatorId : user.uid,
      photoDownloadUrl
      };
    await addDocumentToCollection(collection, dataForm).catch(
      (e) => console.log(e.message)
    ).finally(()=> setNweet(""))
  }
  const onChange = ({target: {value}}) => {
    setNweet(value);
  };
  const onFileChange = ({target : {files}}) =>{
    const file = files[0];
    const reader = new FileReader();
    reader.onload = ({target : {result}}) => {
      setImageSrc(result);
    }
    reader.readAsDataURL(file, imageSrc);
  }
  const clearImageSrc = () => setImageSrc(null);
	return <>
    <form onSubmit={event => onSubmit(event, TWEET)}>
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind?"
            maxLength={120}
          />
          <input type="file" accept="image/*" onChange={onFileChange}/>
          <input type="submit" value="Nweet" />
          {imageSrc && (
          <div>
            <img src={imageSrc} width="50px" height="50px" />
            <button onClick={clearImageSrc}>Clear</button>
          </div>
        )}
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