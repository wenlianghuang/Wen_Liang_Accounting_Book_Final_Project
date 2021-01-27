

//React and related library
import React,{useState,useEffect,useCallback,useContext} from 'react';
import {NavLink,Link,Redirect,useParams,useHistory} from 'react-router-dom'; 

//Link to my local .js file
import {NameandPassword_Login} from './login_user';
import {stockfromplatform}  from './stock_platform';
import {Account_Total_Money} from './login_user';
import {fullDate} from './stock_platform';

//Graphql
import {useQuery} from '@apollo/react-hooks';
import {
    STOCK_QUERY,
    STOCK_SUBSCRIPTION,
} from '../graphql';
import {Stock_AuthButton,To_Deal } from './use-auth';

//About Table Module
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


import Button from '@material-ui/core/Button';

import {ShowYourList} from './decoration/stock_decoration';
import {columns,useDealStyles} from './dealtable_detail';


export default function Deal(){
    const classes = useDealStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(3);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let {id} = useParams();
    let history = useHistory();
    function handleHistory(){
        history.push("/stock_platform");
    }

    //食衣住行其他 handle
    function handleFood(){
      history.push("/stock_platform/Expenses/Food");
    }
    function handleClothing(){
      history.push("/stock_platform/Expenses/Clothing");
    }
    function handleAccommodation(){
      history.push("/stock_platform/Expenses/Accommodation");
    }
    function handleTransport(){
      history.push("/stock_platform/Expenses/Transport");
    }
    function handleOthers(){
      history.push("/stock_platform/Expenses/Others");
    }
    const {loading,error,data,subscribeToMore} = useQuery(STOCK_QUERY);

    
    
    const WholeDate = useContext(fullDate)
    console.log("選擇日期節果: ",WholeDate);
    const [dealname,setDealName] = useState('');
    const [dealstockname,setDealStockName] = useState([]);
    const [dealstocknumber,setDealStockNumber] = useState([]);
    const [dealstockprice,setDealStockPrice] = useState('');
    const [dealbuyorsell,setDealBuyorSell] = useState('');
    const [deal,setDeal] = useState(false);

    const useContextName = useContext(NameandPassword_Login);
    
    useEffect(()=>{
        subscribeToMore({
            document: STOCK_SUBSCRIPTION,
            
            updateQuery: (prev,{subscriptionData})=>{
                if(!subscriptionData) return prev;
                console.log('deal subscripttionData: ',subscriptionData.data.stockcontent.data);
                console.log('prev: ',prev)
                return{
                    stockcontent: [...prev.stockcontent]
                }
            }           
        })
    },[subscribeToMore])
    //Next line are actually useless
    let tmpdealstockname = [],
        tmpdealstocknumber = [],
        tmpdealstockprice = [],
        tmpdealbuyorsell = []
    let test = () => {
        for(let i = 0; i < data.stockcontent.length; i++ ){
            if(data.stockcontent[i].Name === useContextName ){
                tmpdealstockname.push(data.stockcontent[i].stockName);
                tmpdealstocknumber.push(parseInt(data.stockcontent[i].stockNumber,10));
                tmpdealstockprice.push(parseFloat(data.stockcontent[i].stockPrice,10));
                tmpdealbuyorsell.push(data.stockcontent[i].BuyorSell);
            }
        }
    }
    test();
    const handleDetail = (e) => {
        e.preventDefault();
        setDealName(useContextName); 
        setDealStockName(tmpdealstockname);
        setDealStockNumber(tmpdealstocknumber);
        setDealStockPrice(tmpdealstockprice);
        setDealBuyorSell(tmpdealbuyorsell);
        setDeal(true);
    }
    console.log('data stockcontent deal: ',data);
    console.log('deal true or false: ',deal)
    console.log('deal stockname: ',dealstockname);
    //Finish these useless lines
    
    
    let Bank_Account_Price = 0;
    function createData(name, stock_Name, stock_Number, stock_Price,Buy_or_Sell,implement_date) {
        return { name, stock_Name, stock_Number, stock_Price, Buy_or_Sell,implement_date};
    }
      
    const rows = []
    for(let i = 0; i < data.stockcontent.length; i++){
        if(data.stockcontent[i].Name === useContextName ){
            if(data.stockcontent[i].BuyorSell === "buy"){
              rows.push(createData(data.stockcontent[i].Name,
                data.stockcontent[i].stockName,
                data.stockcontent[i].stockNumber,
                parseFloat(data.stockcontent[i].stockPrice,10)*(-1),
                data.stockcontent[i].BuyorSell,
                data.stockcontent[i].fullDate,
                ))
            }else if(data.stockcontent[i].BuyorSell === "sell"){
              rows.push(createData(data.stockcontent[i].Name,
                data.stockcontent[i].stockName,
                data.stockcontent[i].stockNumber,
                parseFloat(data.stockcontent[i].stockPrice,10),
                data.stockcontent[i].BuyorSell,
                data.stockcontent[i].fullDate,
                ))
            }
        }else{
            continue;
        }
    }
    console.log("Account Total Money: ",Account_Total_Money);
    console.log('row: ',rows)
    rows.map((state,index)=>{
      Bank_Account_Price += state.stock_Price;
    })
    let Final_Balance = parseFloat(useContext(Account_Total_Money));
    Final_Balance += Bank_Account_Price;
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <li className="navbar-brand active">
                歡迎來到 {useContextName} 日常收支表
            </li>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Stock_AuthButton/>
                    </li>
                    <li className="nav-item active">
                      <Button onClick={handleHistory} variant="contained" color="primary">Back to Platform</Button>
                    </li>
                    
                </ul>
            </div>
        </nav>
        <div className={classes.pageStyle}>
            
            {deal ? (
                <>
                
                <h3 className="">Bank Account Balance: {Final_Balance}</h3>
                

                <Paper className={classes.root} bg >
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    
                    <TableBody>
                      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} >
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                    
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[3, 5, 10]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
              
              <Button style={{top:"50px"}} variant="contained" color="primary" onClick={handleFood}>Food</Button>
              <Button style={{top:"50px",left:"1vw"}} variant="contained" color="primary" onClick={handleClothing}>Clothing</Button>
              <Button style={{top:"50px",left:"2vw"}} variant="contained" color="primary" onClick={handleAccommodation}>Accommodation</Button>
              <Button style={{top:"50px",left:"3vw"}} variant="contained" color="primary" onClick={handleTransport}>Transport</Button>
              <Button style={{top:"50px",left:"4vw"}} variant="contained" color="primary" onClick={handleOthers}>Others</Button>
              
              
              </>
            ):(
                
                <Button onClick={handleDetail} style={{top:"100px",width:"400px"}} variant="outlined" color="primary" backgroundColor="transparent" >請看收入支出明細</Button>
                
                
                      
            )}

        </div>
        </>
                
    )
}
