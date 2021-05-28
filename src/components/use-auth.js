import React,{useState,useEffect,useContext,createContext} from 'react';
//import * as firebase from "firebase/app";
import firebase from "firebase/app";
import "firebase/auth";
import {Route,Redirect,useHistory,useLocation,Link} from 'react-router-dom';
import homearr from '../externalHomeArr';
import Button from '@material-ui/core/Button';
/*firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    appID: ""
});*/
const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 1); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 1);
    }
};
const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [userName,setUserName] = useState('');
    let signin = (cb) => {
      return fakeAuth.signin(() => {
        setUser("user");
        setUserName('');
        cb();
      });
    };
  
    const signout = cb => {
      return fakeAuth.signout(() => {
        setUser(null);
        setUserName('');
        cb();
      });
    };
  
    return {
      user,
      userName,
      signin,
      signout,
    };
}
export function HeaderwithButton(){
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <div>

    </div>

  ) : (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <li className="navbar-brand active">
      <Link className="nav-link" to={"/"} style={{color: "white"}}>首頁</Link>
    </li>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
      {homearr.map((state,index)=>{
        console.log("State: ",state.urlName);
        return(
        <li className="nav-item active" key={index}>
          <Link className="nav-link" to={state.url}>{state.urlName}</Link>
        </li>)
      })}      
      </ul>
    </div>          
  </nav>
  )
  /*
  return (
  
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <li className="navbar-brand" active>
      <Link className="nav-link" to={"/"}></Link>
    </li>
  {/*
  {auth.user ? (<li className="navbar-brand" active> 
  歡迎來到交易平台 {auth.userName}
  </li>):(
  <li className="navbar-brand" acitve>
    <Link className="nav-link" to={"/"}>請用 Log In 登入</Link>
  </li>
  )}
  
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
    {homearr.map((state,index)=>{
      console.log("State: ",state.urlName);
      return(
      <li className="nav-item active">
        <Link className="nav-link" to={state.url}>{state.urlName}</Link>
      </li>)
    })}      
    </ul>
  </div>
              
  </nav>
  )*/
}
export function AuthButton() {
    let history = useHistory();
    let auth = useAuth();
  
    return auth.user ? (
      <p>
        Welcome! My name is {auth.userName} {" "} 
        <button
          onClick={() => {
            auth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    );
}

export function Stock_AuthButton() {
  let history = useHistory();
  let auth = useAuth();
  
  return (
    <Button 
      variant="contained" 
      onClick={() => {
        auth.signout(()=>history.push("/"))
      }}
      color="primary"
      mr={3}
      >
        Sign out
      </Button>
  )
}

export function To_Deal() {
  let history = useHistory();
  let handleHistory = () => {
    history.push('/stock_platform/Deal');
  }
  return (
    <Button 
      variant="contained" 
      onClick={handleHistory
      }
      color="primary"
      
      >
        To Deal
      </Button>
  )
}

export function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    console.log("Rest: ",rest)
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

export function ProtectedPage({data:{
  name
}}) {
  let auth = useAuth();
  let history = useHistory();
    return(
      <div>
        <h1>{name} </h1>
        <h3>Protected</h3>
        <button 
          onClick={() => {
          auth.signout(()=>history.push("/"))
          }}
        >
          Sign out
        </button>
      </div>
    );
}

export function LoginPage() {
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
  
    let { from } = location.state || { from: { pathname: "/" } };
    let login = () => {
      auth.signin(() => {
        history.replace(from);
      });
    };
  
    return (
      /*
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={login}>Log in</button>
      </div>
      */
     <div>
       {auth.user ? (<p>Your name is {auth.userName}</p>):
       (  <div>        
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={login}>Log in</button>
          </div>
       
        )}
     </div>
      
    );
}
