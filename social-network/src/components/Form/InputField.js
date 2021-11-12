const InputField = ({type,placeholder,value, hook}) => {
  return ( 
    <input 
      type={type} 
      className="form-control form-control-lg mb-3 bg-secondary" 
      placeholder={placeholder}
      value={value}
      onChange = {(e) => hook(e.target.value)}
      required/>
    

   );
}
 
export default InputField;
