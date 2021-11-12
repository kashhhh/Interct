import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostInsights = ({likes, commentHook, clickStatus, postInfo, FetchRequests, linkAPI }) => {

  const [isLiked,setIsLiked] = useState(false);
  const [likesLength,setLikesLength]= useState(0);

  useEffect(async () => {
    const likes=await FetchRequests.getLikes(postInfo.user_id,postInfo.post_id);
    likes.map((like) => {
      if(like.liked_by === parseFloat(localStorage.getItem('user_id'))){
        setIsLiked(true);
      }
    } );
    setLikesLength(likes.length);
  }, []);


  const changeLikes = async() => {
    console.log("Change Color:", isLiked);
    if (isLiked === true){
      setIsLiked(false);
      setLikesLength(likesLength-1);

      const res= await fetch(
        `${linkAPI}/likes/${postInfo.user_id}/${postInfo.post_id}/${localStorage.getItem('user_id')}`,
        {
          method: 'DELETE',
        }
        );
        console.log("Deleted")
      
      
    }
    else{
      setIsLiked(true);
      setLikesLength(likesLength+1);

      const res= await fetch(
        `${linkAPI}/likes/${postInfo.user_id}/${postInfo.post_id}/${localStorage.getItem('user_id')}`,
        {
          method: 'POST',
        }
        );
      console.log("Liked")
    }
    
  }

  return ( 
    <div className=" d-flex bg-light border">
      <button className="d-flex flex-fill bg-light justify-content-center border-0 p-2 text-primary" onClick = {() => changeLikes() } >
      {/* LIKES */}
        {isLiked ? 
        <i className="bi bi-heart-fill pe-2" ></i> : 
        <i className=" bi bi-heart pe-2" ></i> }
        { likesLength }
      </button>

    {/* COMMENTS */}
    
      <button className="d-flex flex-fill bg-light justify-content-center border-0 p-2" >
        <Link to={`/post/${postInfo.user_id}/${postInfo.post_id}`} className="text-decoration-none text-primary">
            <i className="bi bi-chat-right-text me-2"></i> 5
        </Link>
      </button>

    </div>
   );
}
 
export default PostInsights;