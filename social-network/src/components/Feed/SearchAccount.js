import { useEffect, useState } from "react";

const SearchAccount = ({user,displayImage,noOfPosts,FetchRequests}) => {

  const [display,setDisplay] = useState('');
  const [username,setUsername] = useState(''); 
  useEffect(async () => {
    const display = await FetchRequests.getDisplay(user.user_id);
    setDisplay(display);
    setUsername(user.username);
  }, [])

  return ( 
      <div className=" bg-light d-flex border mt-1 mb-1">
        <img src={display} alt="" className="col-3 col-sm-2 p-2 img-fluid rounded-circle h-50"/>
        <div className="">
          <p className=" mb-1 ms-1 pt-1 fs-5"><b>{username}</b></p>
          <p className="fs-6 ms-1">
            Number of Posts: {noOfPosts}
          </p>
        </div>
      </div>
   );
}
 
export default SearchAccount;