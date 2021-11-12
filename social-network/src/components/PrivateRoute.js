import { Redirect, Route } from "react-router";

const PrivateRoute = ({authentication,children, ...rest}) => {
  console.log(children);
  return ( 
    <Route {...rest} render= {( location ) => {
      return  authentication.isAuth=== true ?
        children : 
        <Redirect to='/getstarted' />
    }}>
    </Route>
   );
}
 
export default PrivateRoute;