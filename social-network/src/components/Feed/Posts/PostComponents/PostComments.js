import UserComment from "./UserComment";
import displayIcon from "./../../../../Assets/dp.jpg";
import { useEffect, useState } from "react";

const PostComments = ({FetchRequests,postIds, linkAPI}) => {
  const [comments,setComments]= useState([]);

  const [commentText, setCommentText] = useState('');

  const createComment = async(event) => {
    event.preventDefault();
    console.log(commentText);
    if(commentText!== ''){
      const formData = new FormData();
      formData.append('Comment',commentText);
      formData.append('CommentedUser',localStorage.getItem('user_id'));

      const res = await fetch(
        `${linkAPI}/comments/${postIds.user_id}/${postIds.post_id}`,
        {
          method : 'POST',
          body: formData,
        }
      )
      setCommentText('');
      allComments('');

    }
  }

  const allComments= async() => {
    const comments = await FetchRequests.getComments(parseInt(postIds.user_id), parseInt(postIds.post_id));
    setComments(comments);
  }
  
  useEffect(async () => {
    await allComments();
  }, [])

  return (
    <div className="row bg-light border">
      <div className=" mt-2 mb-2 overflow-auto" style={{maxHeight: '35vh'}}>

        {comments.map((comment,index) => <UserComment commentInfo={comment} FetchRequests={FetchRequests} key={index} />) }

      </div>
      <form className=" d-flex " onClick={createComment}>
        <textarea className="form-control mb-2 me-2" value={commentText} onChange={(e) => { setCommentText(e.target.value) }} placeholder="Type something..." required />
        <button type='submit' className="btn btn-primary mb-2">Post</button>
      </form>
    </div>
   );
}
 
export default PostComments;