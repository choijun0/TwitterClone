import React, {useState,useEffect} from "react";
import { authService, getDocumentByQuery, updateUserProfile } from "fbase";
import { useHistory } from "react-router-dom";

export default ({refreshUser, user}) => {
  const [nweetData, setNweetData] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  useEffect(async ()=>{
  await getDocumentByQuery("tweets", "creatorId", "==", user.uid)
  .then(snapShots => {
    if(snapShots){
      setNweetData(snapShots.docs.map(doc => doc.data()));
    }
  })
  },[]);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (user.displayName !== newDisplayName) {
      await updateUserProfile({ displayName : newDisplayName}).then(()=> refreshUser())
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="new Name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <ul>{nweetData.map(nweet => <li>{nweet.text}</li>)}</ul>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};