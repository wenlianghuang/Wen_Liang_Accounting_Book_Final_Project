import React,{useState,useEffect, useCallback} from 'react';
//import axios from 'axios';
import {useQuery,useMutation} from '@apollo/react-hooks';
import {
    LOGIN_QUERY,
    DELETE_LOGIN_MUTATION,
    LOGIN_SUBSCRIPTION
} from '../graphql'; 

import { Alert, AlertTitle } from '@material-ui/lab';
export default function ChangeEmail(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [total_money,setTotalMoney] = useState(0);
    const [correct,setCorrect] = useState(false);
    const [correctmsg,setCorrectMSG] = useState('');
    const [id,setID] = useState('');
    const {loading,error,data,subscribeToMore} = useQuery(LOGIN_QUERY);
    const [addUpdateLogIn] = useMutation(DELETE_LOGIN_MUTATION);
    useEffect(()=>{
        subscribeToMore({
            document: LOGIN_SUBSCRIPTION,
            updateQuery: (prev,{subscriptionData})=>{
                if(!subscriptionData) return prev
                const newDelete = subscriptionData.data.loginuser.data
                for(let i = 0; i < prev.data.length;i++){
                    if(prev.loginuser.name === newDelete.name && prev.loginuser.password === newDelete.password && prev.loginuser.email === newDelete.email){
                        prev = prev.splice(i,1);
                        break;
                    }else{
                        continue;
                    }
                }
                console.log('prev: ',prev)
                return{
                    loginuser: [...prev.loginuser]
                }
            }

            
        })
    },[subscribeToMore])
    
    const handleDeleteLogIn = async (e)=>{
        
        data.loginuser.map((state,index)=>{
            if(state.name === name && state.email === email && state.password === password){
                setCorrect(true)
                setCorrectMSG(`Delete this ${state.name} Account`);
            }else{
                setCorrectMSG('Account or Email or Password is not correct');
            }
        })
        //e.preventDefault();
        addUpdateLogIn({
            variables:{
                name: name,
                email: email,
                password: password,
                total_money: total_money,
            }
        });
        
        setName('');
        setEmail('');
        setPassword('');
    }

    
   
    return (
        <div className="wrapper">
            <form onSubmit={handleDeleteLogIn}>
                <div className="form-group">
                    <lable>Deleted Name</lable>
                    <input type="text" value={name} placeholder={"Original Account"} onChange={(e)=>setName(e.target.value)} className="form-control" />
                </div>
                
                <div className="form-group">
                    <label>Deleted Password</label>
                    <input type="password" value={email} placeholder={"Original Password"} onChange={(e)=>setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Deleted Email</label>
                    <input type="text" value={password} placeholder={"Original Email"} onChange={(e)=>setPassword(e.target.value)}  className="form-control" />
                </div>
                <div className="form-group">
                    {correct ? (
                        <>
                        <input type="submit" value="Delete Account" className="btn btn-success btn-block" />
                        <p className="CannotSignIn">{correctmsg}</p>
                        </>
                    ):(
                        <>
                        <input type="submit" value="Delete Account" className="btn btn-success btn-block" />
                        <p className="CannotSignIn">{correctmsg}</p>
                        </>
                    )}
                </div>
            </form>
        </div>
    )
}