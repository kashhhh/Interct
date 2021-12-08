import displayIcon from "./../../Assets/dp.jpg";
import SearchAccount from "./SearchAccount";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SearchPage = ({searchInput,setSearchInput, FetchRequests}) => {
  const [users,setUsers]= useState([]);
  useEffect(async () => {
    const users= await FetchRequests.getUsers();
    setUsers(users);
  }, [])
  
  

  return ( 
    <div className="">
      <h5 class="card-header bg-primary text-light mt-1">Users starting with {searchInput.toLowerCase()}:</h5>
      {
        //CHECKS IF FILTERED OBJECT IS EMPTY
        users.length === 0 ?
         <div className="fs-1 d-flex justify-content-center">No Users Found</div>
         :
        users.map((user,index) => {
            // CLEARS THE SEARCH BAR AND LOADS THE USER PAGE ON CLICK 
            if(user.username.toLowerCase().startsWith(searchInput.toLowerCase())){
              return <Link to={`/user/${user.user_id}`} className="text-decoration-none link-dark" onClick= {() => setSearchInput('') } key={index}>
              <SearchAccount FetchRequests={FetchRequests} user={user} displayImage={user.display} noOfPosts={user.post_count} />
            </Link>
            }
            
        })
      }
    </div>
   );
}
 
export default SearchPage;