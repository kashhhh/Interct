import { Redirect } from "react-router";
import CreatePostForm from "./Posts/CreatePostForm";

const CreatePost = () => {
  

  return ( 
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header " >
              <h5 className="modal-title " id="staticBackdropLabel" >Create Post</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  style={{color : ''}}></button>
            </div>
            <div className="modal-body">
              
        
                <CreatePostForm />
            
            </div>
          </div>
        </div>
      </div>
   );
}
 
export default CreatePost;