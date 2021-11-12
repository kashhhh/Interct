import PostNavbar from "./PostNavbar";
import PostInsights from "./PostInsights";
import { useState, useEffect } from "react";
import statueIcon from "./../../../../Assets/statue.jpeg";
import displayIcon from "./../../../../Assets/dp.jpg";

import PostComments from "./PostComments";

const PostDescription = ({description}) => {
  return ( 
    <div className="bg-light border overflow overflow-auto">
      <p>{description}</p>
    </div>
   );
}

const PostImage =({postImage}) => {
  return (
    <div className="d-flex justify-content-center bg-dark border border-dark ">
        <img src={postImage} alt="" className="img-fluid border border-dark" style= {{maxHeight: '60vh', minHeight:'40vh'}}/>
    </div>
  )
}

const FullScreenPost = ({FetchRequests, postInfo, linkAPI}) => {
  const [commentsClicked,setCommentsClicked]= useState(false);
  const [postImage, setPostImage] = useState('');
  const [post,setPost] = useState('');

  const [username,setUsername] = useState('');
  const [display, setDisplay] = useState('');
  const [caption,setCaption] = useState('');
  const [postDate,setPostDate]= useState('');
  

  useEffect(async () => {
    console.log("1");
    const postImg = await FetchRequests.getPostImage(parseInt(postInfo.user_id), parseInt(postInfo.post_id));
    const post = await FetchRequests.getPost( parseInt(postInfo.user_id) , parseInt(postInfo.post_id) );
    console.log("2");
    
    console.log("3");
    const displayIcon = await FetchRequests.getDisplay(postInfo.user_id);

    setUsername(post[0].username)
    setCaption(post[0].caption);
    setPostDate(post[0].created_at);

    setDisplay(displayIcon)
    setPostImage(postImg);
    console.log("a",post,postImage)
  },[]);

  
  return ( 
     
    <div className="mt-2">
      <PostNavbar postInfo={postInfo} postDate={postDate}  display={display} username={username} FetchRequests={FetchRequests} />
      
      <div className="row d-flex">
        
          <PostDescription description={caption} />
          <PostImage postImage={postImage} />
        
        <PostInsights likes={4} FetchRequests={FetchRequests} postInfo={postInfo} commentHook={setCommentsClicked} clickStatus={commentsClicked} linkAPI={linkAPI} />    
      </div>
      <PostComments FetchRequests={FetchRequests} postIds={postInfo} linkAPI={linkAPI} />
    </div>
   );
}
 
export default FullScreenPost;