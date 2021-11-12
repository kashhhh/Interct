import { useState } from "react";
import InputField from "./InputField";

import { Redirect  } from "react-router-dom";

const LoginForm = ({authentication,FetchRequests,userHook, setAlertProperties}) => {
  
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [ redirectToForm, setRedirectToForm ] = useState(false);
  
  //CHECKS IF USER AND PASSWORD ARE IN DB AND RETURNS TRUE/FALSE
  const checkForUser = async(userInfo) => {
    console.log("checking",userInfo);

    let userInDB=false;
    let correctPwd= false;
    userInfo.map((user) => {
      if(user.email === email){
        userInDB=true

        if(user.pwd === password){
          userHook(user);
          correctPwd=true
          localStorage.setItem("user_id",user.user_id);
          console.log("login");
        }
      } 
    });
    if(userInDB===false){
      setAlertProperties(['danger','User does not exist'])
    }
    if(userInDB===true && correctPwd===false){
      setAlertProperties(['danger','Incorrect Password'])
    }
    
    return userInDB;
  }

  //REDIRECTS TO DB IF USER IN DB
  const takeToFeed = async(exists) => {
    
    console.log(exists);
    if(exists){
      authentication.authenticate(() => {
        setRedirectToForm(true);
      });
    }
    else{
      authentication.authenticate(() => {
        setRedirectToForm(false);
        setEmail('');
        setPassword('');
    });
    }
  }

  const login = async(event) => {

    event.preventDefault();
    //GETS ALL USERS
    const users = await FetchRequests.getUsers();
    const isUserInDB = await checkForUser(users);
    const authUser = await takeToFeed(isUserInDB);
  }
  
  if (redirectToForm === true && localStorage.getItem('user_id')!==null){
    console.log("redirecting")
    return <Redirect to='/' />
  }

  return ( 
    <form onSubmit={login}>

        <h4 className="mb-4">Sign In</h4>

        <InputField type="email" placeholder="Email Address" 
        value={email} hook={setEmail} />

        <InputField type="password" placeholder="Password" 
        value={password} hook={setPassword} />

        <button type="submit" className="btn text-light w-100 mb-2 bg-primary" >
          Login
        </button>

    </form>
   );
}
 
export default LoginForm;