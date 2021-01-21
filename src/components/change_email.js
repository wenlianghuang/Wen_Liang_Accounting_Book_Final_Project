import React,{useState,useEffect, useCallback} from 'react';
//import axios from 'axios';
import {useQuery,useMutation} from '@apollo/react-hooks';
import {
    LOGIN_QUERY,
    UPDATE_LOGIN_MUTATION,
    LOGIN_SUBSCRIPTION
} from '../graphql'; 

import { Alert, AlertTitle } from '@material-ui/lab';
export default function ChangeEmail(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [correct,setCorrect] = useState(false);
    const [correctmsg,setCorrectMSG] = useState('');
    const [id,setID] = useState('');
    const {loading,error,data,subscribeToMore} = useQuery(LOGIN_QUERY);
    const [addUpdateLogIn] = useMutation(UPDATE_LOGIN_MUTATION);
    let newLogIn;
    useEffect(()=>{
        subscribeToMore({
            document: LOGIN_SUBSCRIPTION,
            updateQuery: (prev,{subscriptionData})=>{
                if(!subscriptionData) return prev
                newLogIn = subscriptionData.data.loginuser.data
                console.log(`newLogIn name: ${newLogIn.name} and email: ${newLogIn.email}`)
                return{
                    loginuser: [...prev.loginuser]
                }
            }

            
        })
    },[subscribeToMore])
    
    const handleUpdateLogIn = async (e)=>{
        
        data.loginuser.map((state,index)=>{
            if(state.name === name && state.email === email){
                setCorrect(true)
                setCorrectMSG('Update the password successfully');
            }else{
                setCorrectMSG('Account or Email is not correct');
            }
        })
        e.preventDefault();
        addUpdateLogIn({
            variables:{
                name: name,
                email: email,
                password: password,
            }
        });
        
        setName('');
        setEmail('');
        setPassword('');
    }

    
   
    return (
        <div className="wrapper">
            <form onSubmit={handleUpdateLogIn}>
                <div className="form-group">
                    <lable>Your Name</lable>
                    <input type="text" value={name} placeholder={"Original Account"} onChange={(e)=>setName(e.target.value)} className="form-control" />
                </div>
                
                <div className="form-group">
                    <label>Your Email</label>
                    <input type="text" value={email} placeholder={"Original Email"} onChange={(e)=>setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Change Password</label>
                    <input type="text" value={password} placeholder={"Modify Password"} onChange={(e)=>setPassword(e.target.value)}  className="form-control" />
                </div>
                <div className="form-group">
                    {correct ? (
                        <>
                        <input type="submit" value="Create User" className="btn btn-success btn-block" />
                        <p className="CannotSignIn">{correctmsg}</p>
                        </>
                    ):(
                        <>
                        <input type="submit" value="Create User" className="btn btn-success btn-block" />
                        <p className="CannotSignIn">{correctmsg}</p>
                        </>
                    )}
                </div>
            </form>
        </div>
    )
}