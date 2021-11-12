import { useState, useEffect } from "react"

const UserComment = ({commentInfo,FetchRequests}) => {
  const [display,setDisplay] = useState();
  useEffect(async () => {
    const dp = await FetchRequests.getDisplay(commentInfo.commentuser_id);
    setDisplay(dp);
  }, []);

  function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day +  '/' + month + '/'  + year;
  }
  return ( 
    <div className="d-flex border border-start-0 border-end-0 justify-content-between">
      <div class="d-flex ">
      <img src={display} alt="" className="col-2 col-sm-1 p-2 img-fluid rounded-circle " />
      <div className="row">
        <div className="col-9 ms-1 pt-1"><b>{commentInfo.username}</b></div>
        <div className="ms-2 ">
         <p className="">{commentInfo.comment_desc}</p>
         
        </div>
      </div>
      </div>
      
      <p className="text-muted fs-6">{getFormattedDate(new Date(commentInfo.comment_at))}</p>
      
    </div>
   );
}
 
export default UserComment;