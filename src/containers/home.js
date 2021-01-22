import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React,{useState,useEffect} from 'react';
import {useQuery,useMutation} from '@apollo/react-hooks';
import {
  LOGIN_QUERY,
  LOGIN_SUBSCRIPTION
} from '../graphql';
import { BrowserRouter as Router, Switch, Route, Link,useHistory } from "react-router-dom";
import HomePage from '../components/homepage';
import CreateUser from '../components/create_user.js';
import CreateEmail from '../components/change_email.js';
import DeleteUser from '../components/delete_user.js';
import LoginUser from '../components/login_user.js';
import Stock_Platform from '../components/stock_platform';
import Deal from '../components/deal';
import Food from '../components/food';
import Clothing from '../components/clothing';
import Accommodation from '../components/accommodataion';
import Transport from '../components/transport';
import Others from '../components/others';
import homearr from '../externalHomeArr';
import '../components/use-auth';
import { ProvideAuth,PrivateRoute,ProtectedPage,LoginPage,AuthButton,useAuth,HeaderwithButton} from '../components/use-auth';
function Home(){
    const [change,setChange] = useState(false);
    const [signin,setSignIn] = useState('Matt');
    const {loading,error,data,subscribeToMore} = useQuery(LOGIN_QUERY);
    let auth = useAuth();
    let post = {name: "Matt"}
    let history = useHistory();
    const handleTable = ()=>{
      history.push("/Deal/deal")
    }
    /*useEffect(()=>{
      subscribeToMore({
          document: LOGIN_SUBSCRIPTION,
          
          updateQuery: (prev,{subscriptionData})=>{
              if(!subscriptionData) return prev
              return{
                  loginuser: [...prev.loginuser]
              }
          }           
      })
  },[subscribeToMore])*/
    return (
      <>
      <ProvideAuth>
          <div className="App">
            <header>
            <HeaderwithButton/>
            
              {/*
              <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                {change?(<li className="navbar-brand" active>
                  {signin}歡迎
                </li>):(<li className="navbar-brand" acitve>
                    <Link className="nav-link" to={"/"}>請用 Log In 登入</Link>
                </li>)}
              */}
              {/*
              <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                {auth.user ? (<li className="navbar-brand" active> 
                  {auth.userName}歡迎
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
                      </li>
                      )
                    })}      
                  </ul>
                </div>
                
              </nav>
              */}
            </header>
            
            {/*
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  
                  <Switch>
                    <Route exact path='/' component={LoginPage} />
                    
                    <Route path='/create-user' component={CreateUser} />
                    
                    <Route path="/login" component={LoginUser}/>
                    
                    <Route path="/change-email" component={CreateEmail} />
                    
                    <PrivateRoute path="/check-for-login">
                      <ProtectedPage />
                    </PrivateRoute>
                    
                    <Route path="/Deal/:id" component={Deal}/>
                    
                  </Switch>
                </div>
              </div>
            </div>
            */}
            
            <div>
              
              <Switch>
                <Route exact path="/" component={HomePage}/>
                <Route path='/create-user' component={CreateUser}/>
                <Route path='/login' component={LoginUser}/>
                <Route path='/change-email' component={CreateEmail}/>
                <Route path='/delete-account' component={DeleteUser}/>
                {/*
                <Route exact path="/stock_platform" component={Stock_Platform}/>
                
                <Route path="/Deal/:id" component={Deal}/>
                
              </Switch>
                
              
              <PrivateRoute path="/check-for-login">
                <ProtectedPage data={post}/>
              </PrivateRoute>
                */}
              </Switch>
            </div>
            <div>
            <Switch>
                <Route exact path="/stock_platform" component={Stock_Platform}/>
                <Route path="/stock_platform/Deal" component={Deal}/>
                
                <Route path="/stock_platform/Expenses/Food" component={Food}/>
                <Route path="/stock_platform/Expenses/Clothing" component={Clothing}/>
                <Route path="/stock_platform/Expenses/Accommodation" component={Accommodation}/>
                <Route path="/stock_platform/Expenses/Transport" component={Transport}/>
                <Route path="/stock_platform/Expenses/Others" component={Others}/>
                

            </Switch>
            </div>
            
          </div>
          
    </ProvideAuth>
    
    </>
    );
}

export default Home;