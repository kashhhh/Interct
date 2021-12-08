import Post from "../Posts/PostComponents/Post";
import { useEffect, useState } from "react";

const UserPosts = ({userId,displayImage,noOfPosts,FetchRequests}) => {

  const [userPosts,setUserPosts]= useState([]);
  const [user,setUser] = useState();
  const [username,setUsername] =useState('idk');
  const [display,setDisplay] = useState();
  const [date,setDate]= useState()
  useEffect(async() => {
    const userPosts= await FetchRequests.getPostsById(userId);
    const user = await FetchRequests.getUserById(userId);
    const display = await FetchRequests.getDisplay(userId);

    setDisplay(display);
    setUser(user);

    const date =new Date(user[0].created_on);
    setDate(date.toDateString("yyyy-MM-dd"));

    setUsername(user[0].username);
    setUserPosts(userPosts);
    console.log(user,userPosts,);
  }, []);



  return ( 
    <div>
      <div className="row card mt-1 mb-3 border" >
        <h5 class="card-header bg-primary text-light">Profile Information</h5>
        <div className="row g-0 p-2">
          <div className="col-5 col-sm-3">
            <img src={display} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-6">
            <div className="card-body">
              <p className="card-title fs-4 d-block text-truncate"><b>{username} {username==='Aakash Rajpurkar' ? <i class="bi bi-check-circle-fill" style={{color: '#4B78DF'}}></i> :''}</b></p>
              
              <p className="card-text d-block text-truncate"><small className="text-muted">Created On: {date}</small></p>
              <p className="card-text d-block text-truncate"><small className="text-muted">Number of Posts: {userPosts.length}</small></p>
            </div>
          </div>
        </div>
      </div>
      <h5 class="card card-header row bg-primary text-light">All Posts</h5>
      { userPosts.map((post,index) => <Post postInfo={post} key={index} FetchRequests={FetchRequests} />) }
    </div>
   );
}
 
export default UserPosts;