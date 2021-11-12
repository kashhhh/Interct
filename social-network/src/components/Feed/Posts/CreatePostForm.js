const CreatePostForm = ({linkAPI}) => {
  const createPost = async(event) => {
    event.preventDefault();
    const imageFile=event.target[1].files[0];
    const postDescription = event.target[0].value;
    const user_id =localStorage.getItem('user_id');
    
    const formData = new FormData();
    formData.append('File',imageFile);
    formData.append('Caption', postDescription);

    //STORING IMAGES IN UPLOAD FOLDER
    const res= await fetch(
      `${linkAPI}/upload/${user_id}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    window.location.reload(true)
    
  }
  return ( 
    <form onSubmit={createPost} className="">
      <label htmlFor="postImage" className="form-label"><b>Post Description</b></label>
      <textarea className="form-control bg-secondary" id="description" rows="3" placeholder="Write something..." required></textarea>
      
      <label htmlor="postImage" className="form-label mt-1"><b>Post Image</b></label>
      <div className="d-flex">
        <input className="form-control form-control-sm me-2 h-100 bg-secondary" type="file" id="formFileSm" accept=".jpg,.png,.jpeg" required/>
        <button type='submit' className="btn text-light bg-primary" >Post</button>
      </div>
    </form>
   );
}
 
export default CreatePostForm;