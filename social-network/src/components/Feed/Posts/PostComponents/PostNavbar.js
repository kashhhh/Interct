import { Link } from "react-router-dom";
import { useEffect } from "react";

const PostNavbar = ({display, username, postInfo,postDate,FetchRequests}) => {
  const formatDate = () => {
    const date =new Date(postDate);
    return date.toDateString("yyyy-MM-dd");
  }
  return ( 
    
    <Link to={`/user/${postInfo.user_id}/`} className="text-decoration-none link-dark">
      <div className="row bg-light d-flex align-items-center border p-2 ">
          <img src={display} className="rounded-circle img-fluid col-2 col-sm-1 col-md-1 col-lg-1" alt="" />

        <div className="col-10 fs-6 d-flex justify-content-between"> 
          <span><b>{username}{username==='Aakash Rajpurkar' ? <i class="bi bi-check-circle-fill ms-2" style={{color: '#4B78DF'}}></i> :''}</b></span>
          <span className="text-muted">{formatDate().substr(4,)}  </span>
           </div>
      </div>
    </Link>
   );
}
 
export default PostNavbar;