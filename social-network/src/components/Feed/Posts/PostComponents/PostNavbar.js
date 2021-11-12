import { Link } from "react-router-dom";
import { useEffect } from "react";

const PostNavbar = ({display, username, postInfo,FetchRequests}) => {

  return ( 
    
    <Link to={`/user/${postInfo.user_id}/`} className="text-decoration-none link-dark">
      <div className="row bg-light d-flex align-items-center border p-2 ">
          <img src={display} className="rounded-circle img-fluid col-2 col-sm-1 col-md-1 col-lg-1" alt="" />

        <div className="col-8 fs-6"><b>{username}</b></div>
      </div>
    </Link>
   );
}
 
export default PostNavbar;