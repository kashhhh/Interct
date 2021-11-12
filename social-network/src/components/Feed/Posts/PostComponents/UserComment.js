import { useState, useEffect } from "react"

const UserComment = ({commentInfo,FetchRequests}) => {
  const [display,setDisplay] = useState();
  useEffect(async () => {
    const dp = await FetchRequests.getDisplay(commentInfo.commentuser_id);
    setDisplay(dp);
  }, [])
  return ( 
    <div className="d-flex border border-start-0 border-end-0 ">
      <img src={display} alt="" className="col-2 col-sm-1 p-2 img-fluid rounded-circle h-50"/>
      <div className="row">
        <div className="col-9 ms-1 pt-1"><b>{commentInfo.username}</b></div>
        <p className="ms-2">
         {commentInfo.comment_desc}
        </p>
      </div>
    </div>
   );
}
 
export default UserComment;