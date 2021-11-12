import PostNavbar from "./PostNavbar";
import PostInsights from "./PostInsights";
import { useState,useEffect } from "react";
import statueIcon from "./../../../../Assets/statue.jpeg";
import displayIcon from "./../../../../Assets/dp.jpg";
import { Link } from "react-router-dom";



const PostDescription = ({postInfo}) => {
  return ( 
    <div className="bg-light border overflow overflow-auto" >
      <Link to={`/post/${postInfo.user_id}/${postInfo.post_id}`} className="text-decoration-none link-dark">
      <p className="fs-6 mt-1">{postInfo.caption}</p>
      </Link>
    </div>
   );
}

const PostImage =({postImage,postInfo}) => {
  return (
    <div className="d-flex justify-content-center bg-dark border ">
      <Link to={`/post/${postInfo.user_id}/${postInfo.post_id}`} className="text-decoration-none link-dark">
        <img src={postImage} alt="" className="img-fluid border border-dark" style= {{maxHeight: '60vh', minHeight:'25vh'}}/>
      </Link>
    </div>
  )
}

const Post = ({ postInfo, FetchRequests, linkAPI }) => {
  const [commentsClicked,setCommentsClicked]= useState(false);
  const [postImage, setPostImage] = useState('');
  const [display,setDisplay] =useState('');
  

  useEffect(async () => {
    const postImg = await FetchRequests.getPostImage(postInfo.user_id,postInfo.post_id);
    const dp = await FetchRequests.getDisplay(postInfo.user_id);
    setDisplay(dp);
    setPostImage(postImg);
  }, [])

  return ( 
    <div className="mt-2" >
      <PostNavbar username={postInfo.username} display={display} postInfo={postInfo} FetchRequests={FetchRequests} />
      
      <div className="row d-flex">
        
          <PostDescription postInfo={postInfo}/>
          <PostImage postImage={postImage} postInfo={postInfo} />
        
        <PostInsights likes={4} commentHook={setCommentsClicked} linkAPI={linkAPI} postInfo={postInfo} clickStatus={commentsClicked} FetchRequests={FetchRequests} />    
      </div>

     
    </div>
   );
}
 
export default Post;
