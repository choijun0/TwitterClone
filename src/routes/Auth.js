import React, {useState} from "react";
import {
authService, 
createNewAccount, 
signInAccount, 
popupSignInWithProviders} from "fbase.js"

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const toggleAccount = () => {
    setNewAccount(state => !state);
  }
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if(newAccount){
      await createNewAccount(email, password).then((resolved) => {
        setNewAccount(false);
      }).catch(error => {
        setError(error.message);
      })
    }
    else{
      await signInAccount(email, password).then(()=>{
        
      })
    }
  };
  const onSigninClick = ({target : {name}}) => {
    popupSignInWithProviders(name).then((resolved)=>{
    }).catch( e => {
      console.log(e.message);
    })
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create" : "Log In"}/>
      </form>
      <div onClick={toggleAccount}>{newAccount ? "CreateNewAccount" : "Sign In"} </div>
      <div>{error}</div>
      <div>
        <button name="Google" onClick={onSigninClick}>Continue with Google</button>
        <button name="GitHub" onClick={onSigninClick}>Continue with Github</button>
      </div>
    </div>
  );
};


export default Auth;
