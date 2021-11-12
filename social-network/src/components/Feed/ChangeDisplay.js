const ChangeDisplay = ({linkAPI}) => {
  
  const changeDisplay = async(event) => {
    event.preventDefault();
    const displayImg= event.target[0].files[0];
    const user_id = localStorage.getItem('user_id');

    const formData = new FormData();
    formData.append('Display',displayImg);

    const res = await fetch(
      `${linkAPI}/displays/${user_id}`,
      {
        method: 'PUT',
        body: formData,
      }
    )

    window.location.reload();
  }
  
  
  return ( 
    <div className="modal fade" id="changeDisplay" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="changeDisplayLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="changeDisplayLabel">Display Image</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              
              <form onSubmit={changeDisplay}>   
                <div className="row">
                  <input className="form-control form-control h-100" type="file" id="formFile" accept=".jpg,.png,.jpeg" required/>
                  <button type='submit' className="btn btn-dark mt-2">Change</button>
                </div>
              </form>
            
            </div>
          </div>
        </div>
      </div>
   );
}
 
export default ChangeDisplay;