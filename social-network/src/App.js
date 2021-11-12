import './App.css';
import FormPage from './components/FormPage';
import Feed from './components/Feed';
import { BrowserRouter as Router ,
           Route, Redirect, Switch} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';

function App() {

  const [loggedInUser,setLoggedInUser] = useState(localStorage.getItem('user_id'));
  const linkAPI = "http://localhost:5000";
  // STATE FOR AUTHENTICATION
  const fakeAuth = {
    isAuth: false,
    authenticate(cb){
      this.isAuth=true;
      setTimeout(cb,100);
    },
    signout(cb){
      this.isAuth= false;
      setTimeout(cb,100);
    }
  }

  const FetchRequests = {
     //GETS ALL USERS
    getUsers : async () => {
      const response= await fetch(`${linkAPI}/users`);
      const users= await response.json();
      return users;
    },

    getPostCount : async() => {
      const response = await fetch(`${linkAPI}/users/count`);
      const postCount = await response.json();
      return postCount;
    } ,

    getUserById : async (user_id) => {
      const response = await fetch(`${linkAPI}/users/${user_id}`)
      const user= await response.json();
      console.log(user);
      return user;
    },

    getDisplay : async (user_id) => {
      console.log(loggedInUser);
      const response = await fetch(`${linkAPI}/displays/${user_id}`);
      //const convertToBlob = await response.blob();
      //const imageLink = await URL.createObjectURL(convertToBlob);
      return response.url;
    },

    getPosts : async () => {
      const response = await fetch(`${linkAPI}/posts`);
      const posts= await response.json();
      console.log("posts",posts)
      return posts;
    },

    getPostsById : async(user_id) => {
      const response = await fetch(`${linkAPI}/posts/${user_id}`);
      const posts= await response.json();
      console.log("posts",posts)
      return posts;
    },

    getPost : async (user_id,post_id) => {
      const response = await fetch(`${linkAPI}/posts/${user_id}/${post_id}`);
      const post = await response.json();
      console.log("post",post)
      return post;
    },

    getPostImage : async (user_id,post_id) => {
      const response = await fetch(`${linkAPI}/posts/images/${user_id}/${post_id}`)
      return response.url;
    },

    getComments : async (user_id, post_id) => {
      const response = await fetch(`${linkAPI}/comments/${user_id}/${post_id}`);
      const comments= await response.json();
      console.log("Comments",comments);
      return comments;
    },

    getLikes : async (user_id,post_id) => {
      const response = await fetch(`${linkAPI}/likes/${user_id}/${post_id}`);
      const likes= await response.json();
      console.log("Likes",likes);
      return likes;
    }
  }

  

  // const getPostImage = async(user_id,post_id) => {
  //   const response = await fetch(`http://localhost:5000/posts/images/${user_id}/${post_id}`)
  //   return response.url;
  // }


  return (
    <Router>
      <div className="App">
        <Switch >
        <Route exact path="/getstarted" >
          <FormPage authentication={fakeAuth} userHook={setLoggedInUser} FetchRequests={FetchRequests} linkAPI={linkAPI} />
        </Route>

        {/* WONT OPEN UNTIL YOU LOGIN */}
        <Route path="/" >
          {loggedInUser=== null ? 
            <Redirect to='/getstarted' /> :
            <Feed 
            currentUser={loggedInUser} 
            FetchRequests={FetchRequests}
            linkAPI={linkAPI}
            />  }
        </Route >
        </Switch>

      </div>
    </Router>
  );
}

export default App;
