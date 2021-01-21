// ** create-user.component.js ** //

import React, {useState,useEffect,useCallback} from 'react';
import {useQuery,useMutation} from '@apollo/react-hooks';
import {
    LOGIN_QUERY,
    CREATE_LOGIN_MUTATION,
    LOGIN_SUBSCRIPTION
} from '../graphql'; 
import {useHistory} from 'react-router-dom';
export default function CreateUse() {
    
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [total_money,setTotal_Money] = useState('');
    const [test,setTest] = useState(false);
    const {loading,error,data,subscribeToMore} = useQuery(LOGIN_QUERY);
    const [addLogIn] = useMutation(CREATE_LOGIN_MUTATION);

    useEffect(()=>{
        subscribeToMore({
            document: LOGIN_SUBSCRIPTION,
            updateQuery: (prev,{subscriptionData})=>{
                console.log("subscription data: ",subscriptionData.data);
                console.log("prev: ",prev)
                if(!subscriptionData) return prev
                const newLogIn = subscriptionData.data.loginuser.data
                return{
                    ...prev,
                    loginuser: [...prev.loginuser,newLogIn]
                }
            }
        })
    },[subscribeToMore])
    console.log('data create login detail: ',data)
    const handleLogIn = useCallback((e)=>{
        e.preventDefault()
        addLogIn({
            variables:{
                name:name,
                email:email,
                password: password,
                total_money: total_money,
            }
        })
        setName('');
        setEmail('');
        setPassword('');
        setTotal_Money('');
    },[addLogIn,name,email,password,total_money])
        return (
            <div className="wrapper">
                <form onSubmit={handleLogIn}>
                    <div className="form-group">
                        <label>Add User Name</label>
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Create the Account" />
                    </div>
                    <div className="form-group">
                        <label>Add User Password</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Crate the Password" />
                    </div>
                    <div className="form-group">
                        <label>Add User Email</label>
                        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Create the Email" />
                    </div>
                    
                    <div className="form-group">
                        <lable>Deposit</lable>
                        <input type="password" value={total_money} onChange={(e)=>setTotal_Money(e.target.value)} className="form-control" placeholder="Deposit your Money!!!" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Sign up Your Stock Account" className="btn btn-success btn-block" />
                    </div>
                    
                    
                </form>
            </div>
        )
}