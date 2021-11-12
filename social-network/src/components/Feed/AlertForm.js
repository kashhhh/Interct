import { useState, useEffect } from "react";

const AlertForm = ({alertProperties,setAlertCalled}) => {

  const [alert,setAlert] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      console.log('false');
      setAlert(false);
      setAlertCalled(false);
    }, 4000);
    console.log('true');
    setAlert(true);
    setAlertCalled(false);

  }, [alertProperties]);

  return ( 
    <div class="">
      {alert ? <div className={`alert alert-${alertProperties[0]}`} role="alert">{alertProperties[1]}</div> : ''}
      
    </div>
    
   );
}
 
export default AlertForm;