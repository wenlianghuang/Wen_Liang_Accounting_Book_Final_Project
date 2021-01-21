import React,{useState,useEffect,useContext,createContext} from 'react';
import axios from 'axios';
import { Link,NavLink,useHistory,useLocation,Redirect,Route } from 'react-router-dom';
import "./components.css";
import {useQuery,useMutation} from '@apollo/react-hooks';
import {
    LOGIN_QUERY,
    LOGIN_SUBSCRIPTION
} from '../graphql'; 
import { ProvideAuth,PrivateRoute,ProtectedPage,LoginPage,AuthButton,useAuth } from './use-auth';
import Stock_Platform from './stock_platform';

export let NameandPassword_Login = {};//Stock Platform will recieve this variable of name and password
export let Account_Total_Money = ''
export default function LogInUser(){
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    //const [correct,setCorrect] = useState(false);
    const [correct,setCorrect] = useState(false);
    const [correctmsg,setCorrectmsg] = useState('');
    const [resdetail,setResdetail] = useState('');
    const {loading,error,data,subscribeToMore} = useQuery(LOGIN_QUERY);
    
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth();
    let { from } = location.state || { from: { pathname: "/stock_platform",state: {reload: true} } };
    let login = () => {
        auth.signin(() => {
          history.replace(from);
        });
    };
    useEffect(()=>{
        subscribeToMore({
            document: LOGIN_SUBSCRIPTION,
            
            updateQuery: (prev,{subscriptionData})=>{
                if(!subscriptionData.data) return prev
                console.log('login subscription: ',subscriptionData.data.loginuser.data);
                console.log("prev: ",prev)
                return{
                    loginuser: [...prev.loginuser]
                }
            }           
        })
    },[subscribeToMore])
    
    console.log('loginuser: ',data)
    return (
        <div className="wrapper">
            <form onSubmit={ function(e){
                
                /*data.loginuser.map((state,index)=>{
                    if(state.name === name && state.password === password){
                        //setCorrect(true)
                        setCorrect(true);
                        setCorrectmsg('Update the password successfully');
                        //ContentDetail = createContext(name);
                    }else{
                        setCorrect(false)
                        setCorrectmsg('Account or Password is not correct');
                    }
                })*/
                e.preventDefault();
                let tmptotmoney = '';
                if(data.loginuser.length === 0){
                    setCorrectmsg("No account, please create a new one")
                }else{
                for(let i = 0; i < data.loginuser.length; i++){
                    if(data.loginuser[i].name === name && data.loginuser[i].password === password){
                        setCorrect(true);
                        setCorrectmsg('Update the password successfully');
                        tmptotmoney = data.loginuser[i].total_money;
                        break;
                    }
                    
                    else{
                        setCorrectmsg('Account or Password is not correct,please check them or create a new account');
                    }
                }}
                e.preventDefault();
                setName('')
                setPassword('')
                
                const nameandpassword = name;
                NameandPassword_Login = createContext(nameandpassword);
                Account_Total_Money = createContext(tmptotmoney);
                
                      
                
            }}>
                
                <div className="form-group">
                    <lable>Account</lable>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e)=>setName(e.target.value)} 
                        placeholder="Your Name"
                        className="form-control" />
                </div>
                
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Your Password" 
                        className="form-control" />
                </div>
                
                
                <div className="form-group">
                    {correct?(
                        <>
                        
                        <input type="submit" value="Sign in" onClick={login()} className="btn btn-success btn-block" />
                        
                        {/*
                        <Redirect to={"/stock_platform"}/>
                        */}
                        </>
                    ):(<>
                        <input type="submit" value="Sign in" className="btn btn-success btn-block" />
                        <p className="CannotSignIn">{correctmsg}</p>
                       </>
                    )

                    }
                </div>
                
            </form>
            
        </div>
    )

}