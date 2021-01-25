

//React and related library
import React,{useState,useEffect,useCallback,useContext} from 'react';
import {useHistory} from 'react-router-dom'; 

//Link to my local .js file
import {NameandPassword_Login} from './login_user';
import {stockfromplatform}  from './stock_platform';
import {Account_Total_Money} from './login_user';

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

import {columns,useDealStyles} from './dealtable_detail';  


export default function Clothing(){
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

    let history = useHistory();
    function handleHistory(){
        history.push("/stock_platform");
    }
    const {loading,error,data,subscribeToMore} = useQuery(STOCK_QUERY);



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
    
    const useContextName = useContext(NameandPassword_Login);

    

    function createData(name, running_item, running_type, price,Buy_or_Sell) {
      return { name, running_item, running_type, price, Buy_or_Sell};
    }
    const rows = []

    for(let i = 0; i < data.stockcontent.length; i++){
        if(data.stockcontent[i].Name === useContextName ){
            if(data.stockcontent[i].stockNumber === "others" || data.stockcontent[i].stockNumber==="其他"){
                if(data.stockcontent[i].BuyorSell === "buy"){
                    rows.push(createData(data.stockcontent[i].Name,
                      data.stockcontent[i].stockName,
                      data.stockcontent[i].stockNumber*(-1),
                      parseFloat(data.stockcontent[i].stockPrice,10),
                      data.stockcontent[i].BuyorSell,
                      ))
                  }else if(data.stockcontent[i].BuyorSell === "sell"){
                    rows.push(createData(data.stockcontent[i].Name,
                      data.stockcontent[i].stockName,
                      data.stockcontent[i].stockNumber,
                      parseFloat(data.stockcontent[i].stockPrice,10),
                      data.stockcontent[i].BuyorSell,
                      ))
                  }
            }   
        }else{
            continue;
        }
    }
    console.log('rows: ',rows)
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <li className="navbar-brand active">
                歡迎來到 {useContextName} 的交易平台
            </li>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Stock_AuthButton/>
                    </li>
                    <li className="nav-item active">
                      <Button onClick={handleHistory} variant="contained" color="primary">Back to platform</Button>
                    </li>
                    <li>
                        <To_Deal/>
                    </li>
                </ul>
            </div>
        </nav>

        <div className={classes.pageStyle}>
        <Paper className={classes.root}>
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
            </div>
        </>
    )
}