const SearchBar = ({placeholder, searchValue, searchHook}) => {

  return ( 
    <div className="input-group">
      <input type="text" className="form-control" id="search-bar" 
        placeholder={placeholder} 
        value={searchValue} 
        onChange = {(e) => searchHook(e.target.value) }/>    
    </div>
   );
}
 
export default SearchBar;