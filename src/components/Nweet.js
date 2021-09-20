import React, { useState } from "react";
import {deleteDocumentById, updateDocumentById, deleteStorageDataByUrl} from "fbase";
import { TWEET } from "routes/Home"


const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTweet, setupdatedTweet] = useState(nweetObj.text);
  const {photoDownloadUrl} = nweetObj;
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure? >_<");
    if (ok) {
      deleteDocumentById(TWEET, nweetObj.id)
      deleteStorageDataByUrl(nweetObj.photoDownloadUrl); 
    }
  };
  const onChange = e => {
    const {
      target: { value },
    } = e;
    setupdatedTweet(value);
  };
  const onSubmit = async e =>{
    e.preventDefault();
    toggleEditing();
    updateDocumentById(TWEET, nweetObj.id, {text : updatedTweet});
  }
  const toggleEditing = () => setEditing(prev => !prev)
  return (
    <>
      {editing ? <>
      <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit"
              value={updatedTweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Let's update!!" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
    </> : <>
      <h4>{nweetObj.text}</h4>
      {photoDownloadUrl && <img src={photoDownloadUrl} width="50px" height="50px"/>}
    </> }
      {isOwner && (
         <>
           <button onClick={onDeleteClick}>Delete Nweet</button>
           <button onClick={toggleEditing}>Edit?</button>
         </>
      )}
    </>
  );
};


export default Nweet;