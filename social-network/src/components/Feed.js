import ProfileCard from "./Feed/ProfileCard";
import displayIcon from "./../Assets/dp.jpg";
import CreatePostModal from "./Feed/CreatePostModal";
import {Route, Switch, useParams } from "react-router-dom";
import FullScreenPost from "./Feed/Posts/PostComponents/FullScreenPost";
import SearchPage from "./Feed/SearchPage";
import { useState } from "react";
import Posts from "./Feed/Posts/PostComponents/Posts";
import UserPosts from "./Feed/Posts/UserPosts";
import Navbar from "./Feed/Navbar";
import { Modal } from "bootstrap";
import ChangeDisplay from "./Feed/ChangeDisplay";
import feedImg from './../Assets/feed2.jpg';

const Feed = ({currentUser,FetchRequests, linkAPI}) => {
  const [searchInput,setSearchInput] = useState('');
  let { user_id } = useParams();
  let { post_id } = useParams();

  return ( 
    <div className="vh-100 d-flex justify-content-center bg-success overflow-auto" style={{backgroundImage: `url(${''})`}}>
      {console.log("abc")}
      <div className="row col-12 col-xl-10 shadow-sm ">
      
      <Navbar searchInput={searchInput} setSearchInput={setSearchInput} />

      <div className="d-flex p-1 bg-secondary container" style={{height: '100%'}}>
        
        <div className="container-fluid  overflow-auto col-lg-9 col-md-12 col-12 border bg-danger">

          
          <CreatePostModal linkAPI={linkAPI}/>
          <ChangeDisplay linkAPI={linkAPI}/>

          <Switch>
            <Route exact path="/">
              {searchInput === '' ? 
                <Posts FetchRequests={FetchRequests} linkAPI={linkAPI}/>
                :
                <SearchPage FetchRequests={FetchRequests} searchInput={searchInput} setSearchInput={setSearchInput} linkAPI={linkAPI} />}
            </Route>
            
            <Route exact path="/post/:user_id/:post_id" render = { (props) => {
                if(searchInput === ''){
                  console.log(props.match.params);
                  return <FullScreenPost FetchRequests={FetchRequests} postInfo={props.match.params} linkAPI={linkAPI} />
                } 
                else{
                  return <SearchPage FetchRequests={FetchRequests} searchInput={searchInput} setSearchInput={setSearchInput} linkAPI={linkAPI} />
                }
              }
            } />
                
            <Route exact path="/user/:user_id" render = { (props) =>  {
                if(searchInput === ''){
                  console.log(props.match.params);
                  return <UserPosts userId={props.match.params.user_id} username="Aakash Rajpurkar" displayImage={displayIcon} noOfPosts={5} FetchRequests={FetchRequests} linkAPI={linkAPI} />
                } 
                else{
                  return <SearchPage FetchRequests={FetchRequests}  searchInput={searchInput} setSearchInput={setSearchInput} linkAPI={linkAPI} />
                }
              }
            } >
            </Route>
          </Switch>
          
        </div>
        <ProfileCard FetchRequests={FetchRequests} currentUser={currentUser} linkAPI={linkAPI}/>
      </div>
      </div>
    </div>
   );
}
 
export default Feed;