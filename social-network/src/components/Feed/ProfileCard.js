import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import CreatePostForm from "./Posts/CreatePostForm";

const ProfileCard = ({FetchRequests, linkAPI}) => {
  const [images,setImages] =useState('');
  const [user,setUser]= useState('');
  
  const loadDisplay = async () => {
    const response=await FetchRequests.getDisplay(localStorage.getItem('user_id'));
    console.log(response)
    setImages(response);
    return response;
  }

  useEffect(async () => {
    await loadDisplay();
    const userGet = await FetchRequests.getUserById(localStorage.getItem('user_id'));
    console.log(userGet,userGet[0].username)
    setUser(userGet[0]);

  },[])
  
  return ( 
    <div className=" col-3 d-none d-lg-block p-2" >
      
      <div className="card align-items-center pt-2 pb-4 mt-2 border shadow-sm " style={{backgroundColor: 'white'}} >

          <h5 class="card-header bg-primary col-11 mb-2 text-light">Profile</h5>
          {/* DISPLAY PICTURE & USERNAME*/}
          <img className="card-img-top rounded-circle w-50 h-50" src={images} alt="Left Card DP" /> 

          <div className="row">

            <div class="dropdown d-flex justify-content-center">
              <Link class="dropdown-toggle text-decoration-none text-dark" to='#' role="button" id="changeDisplayDropdown" data-bs-toggle="dropdown" aria-expanded="false" style={{fontSize: '2vw'}}>
                <b>{user.username}</b>
              </Link>

              <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="changeDisplayDropdown">
                <li>
                  <a type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#changeDisplay">
                Change Display
                  </a>
                </li>
              </ul>
          </div>
          </div>
              
            <div class="d-flex mb-1">
              <Link to='/' className="btn btn-outline-primary m-1">
                <i className="bi bi-house-door"></i> Home
              </Link>

              {/*MY ACCOUNT*/}
              <Link to={`/user/${localStorage.getItem('user_id')}`} className="btn m-1 btn-outline-primary">
                <i className="bi bi-person"></i> My Account
                </Link>
            </div>
              {/*LOGOUT*/}
              <Link to='/getstarted' className="btn btn-outline-primary" onClick={ async() =>{
                await localStorage.removeItem("user_id");
                console.log("Logged out");
              } } >
                <i className="bi bi-box-arrow-right "  ></i> Log Out
              </Link>

      </div>
      
      <div class="card p-2 pt-2 pb-3 mt-4 shadow-sm">
        <h5 class="card-header bg-primary text-light mb-1">Create Post</h5>
        <CreatePostForm linkAPI={linkAPI}/>
      </div>
    </div>
   );
}
 
export default ProfileCard;