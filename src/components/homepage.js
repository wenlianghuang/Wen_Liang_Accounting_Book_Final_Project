import React from 'react';
import {useHistory,useLocation} from 'react-router-dom'
import { yellow } from '@material-ui/core/colors';
export default function HomePage(){
    let history = useHistory();
    let location = useLocation();
    return(
        <>
        <h2 style={{color:"#2E4053"}}>Welcome to My Account Book</h2>
        <h4 style={{color:"red",textTransform:"capitalize"}}>There are some brief introduction to implement your accounting book</h4>
        
        {/*<div style={{fontSize:"20px",top:"25px"}}>
            <p>1 Button the Log In, if you do not have the account, it will show error</p>
            <p>2 Button the Create Account, add your user name, user password, user email and deposite your money</p>
            <p>3.Log In to the accounting book page and you can see the using item, using type,the price of item, date, and to check it is income your expense</p>
            <p>4.Press the button "交易" and the trade success</p>
            <p>5.Press the button "To Deal" of the upper right and it will redirect to your accounting page </p>
            <p>6.Add the "請看收入支出明細" button and it will show the result</p>
            <p>7.There are five bottom buttons(Food,Clothing,Accommodation,Transport,Others),you go into each page</p>
        </div>
    */}
        <ol style={{width:"80%",margin:"auto",paddingLeft:0,listStylePosition:"inside",textAlign:"left",fontSize:"20px",paddingTop:"1.5rem"}}>
            <li>Button the Log In, if you do not have the account, it will show error</li>
            <li>Button the Create Account, add your user name, user password, user email and deposite your money</li>
            <li>Log In to the accounting book page and you can see the using item, using type,the price of item, date, and to check it is income your expense</li>
            <li>Press the button "交易" and the trade success</li>
            <li>Press the button "To Deal" of the upper right and it will redirect to your accounting page </li>
            <li>Add the "請看收入支出明細" button and it will show the result</li>
            <li>There are five bottom buttons(Food,Clothing,Accommodation,Transport,Others),you go into each page</li>
        </ol>
        </>
    )
}