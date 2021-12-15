import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Navbar = ({searchInput,setSearchInput}) => {
  return ( 
    <nav className="navbar border-bottom bg-primary " style={{ maxHeight: '10vh' }} >
      <Link to='/' className="col-2 navbar-brand d-none d-lg-block text-light" onClick = {() => setSearchInput('')}>
        <h5 className="pt-1"><i class="bi bi-person-badge"></i> Interct</h5>
      </Link>
      
      <div className="navbar-brand nav-item dropdown">
        <Link className="col-2 navbar-brand d-lg-none dropdown-toggle text-light" to='#' id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-person-badge"></i> Interct
        </Link>
        
        <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarDarkDropdownMenuLink">
          <li><Link className="dropdown-item" to='/'>Home</Link></li>
          <li><Link className="dropdown-item" to='#' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create Post</Link></li>
          <li><Link className="dropdown-item" to='#' data-bs-toggle="modal" data-bs-target="#changeDisplay">Change Display</Link></li>
          <li><Link className="dropdown-item" to={`/user/${localStorage.getItem('user_id')}`}>My Account</Link></li>
          <li><Link className="dropdown-item" to='/getstarted'>Logout</Link></li>
        </ul>
      </div>

      <div className="col-7 pe-2">
        {/* SEARCH BAR */}
        <SearchBar placeholder="Search for users" searchHook={setSearchInput} searchValue={searchInput} />
      </div>
    </nav>
   );
}
 
export default Navbar;