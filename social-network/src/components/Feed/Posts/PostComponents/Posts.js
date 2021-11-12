import Post from "./Post";
import { useEffect, useState } from "react";

const Posts = ({FetchRequests, linkAPI}) => {
  const [posts,setPosts] = useState([]);
  
  const allPosts = async() => {
    const posts= await FetchRequests.getPosts();
    console.log(posts);
    setPosts(posts);
    return posts;
  }

  useEffect(async () => {
    const posts= await FetchRequests.getPosts();
    console.log(posts);

    setPosts(posts);

  },[] )
  return (
    <div className="">
      { posts.map((post,index) => <Post postInfo={post} key={index} FetchRequests={FetchRequests} linkAPI={linkAPI} /> )  }

    </div>
    
   );
}
 
export default Posts;