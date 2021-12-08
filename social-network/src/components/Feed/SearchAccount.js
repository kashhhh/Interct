import { useEffect, useState } from "react";

const SearchAccount = ({user,displayImage,noOfPosts,FetchRequests}) => {

  const [display,setDisplay] = useState('');
  const [username,setUsername] = useState(''); 
  useEffect(async () => {
    const display = await FetchRequests.getDisplay(user.user_id);
    setDisplay(display);
    setUsername(user.username);
  }, []);

  const formatDate = () => {
    const date = new Date(user.created_on);
    return date.toDateString("yyyy-MM-dd");
  }

  return ( 
      <div className=" bg-light d-flex border mt-1 mb-1">
        <img src={display} alt="" className="col-3 col-sm-2 p-2 img-fluid rounded-circle h-50"/>
        <div className="">
          <p className=" mb-1 ms-1 pt-1 fs-5"><b>{username} {username==='Aakash Rajpurkar' ? <i class="bi bi-check-circle-fill" style={{color: '#4B78DF'}}></i> :''}</b></p>
          <p className="fs-6 ms-1">
            Number of Posts: {noOfPosts} <br/>
            Created on: {formatDate()}
          </p>
        </div>
      </div>
   );
}
 
export default SearchAccount;