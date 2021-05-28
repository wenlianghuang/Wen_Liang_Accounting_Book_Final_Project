import React,{useState,useEffect,useContext,useCallback,createContext} from 'react';
import {useStyles,
        NameandNumberTextField,
        BootstrapInput,
        PriceTextField,
        DealBuyButton,
        DealSellButton} from './decoration/stock_decoration';
import InputLabel from '@material-ui/core/InputLabel';
import FormContral from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import {Redirect,useHistory} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import './components.css';
import { ProvideAuth,PrivateRoute,ProtectedPage,LoginPage,AuthButton,useAuth,Stock_AuthButton,To_Deal } from './use-auth';
import {NameandPassword_Login} from './login_user';

//grqphql
import {useQuery,useMutation} from '@apollo/react-hooks';
import {
    STOCK_QUERY,
    CREATE_STOCK_MUTATION,
    STOCK_SUBSCRIPTION
} from '../graphql';

//crawl the stock name;
import { convertCSVToArray } from 'convert-csv-to-array';

/*var fs = require('fs');
export let stocksomethin = [];*/
export let fullDate = '';
export default function Stock_Platform() {
    const [stockname,setStockName] = useState('');
    const [stocknumber,setStockNumber] = useState('');
    const [stockprice,setStockPrice] = useState('');
    const [buyorsell,setStockBuyorSell] = useState("buy");//true is "buy"
    const [deal,setDeal] = useState(false);
    const [dealmsg,setDealmsg] = useState('');
    const [selectedDate,handleDateChange] = useState('');
    const {loading,error,data,subscribeToMore} = useQuery(STOCK_QUERY);
    const [addStock] = useMutation(CREATE_STOCK_MUTATION)
    const classes = useStyles();
    const useContextNameandPassword = useContext(NameandPassword_Login);
    const useContextName = useContextNameandPassword;
    
    /*var crawl_stockname = fs.readFileSync('./crawl_csv/test.csv').toString();
    const crawl_stockname_detail = convertCSVToArray(crawl_stockname,{
        type:'array',
        separator:',',
    })
    crawl_stockname_detail.map((state,index)=>{
        console.log(state[1]);
    })*/
    
    let history = useHistory();
    //console.log('useContentName: ',useContextName);
    console.log('data.stockcontent platform: ',data);
    
    useEffect(()=>{
        subscribeToMore({
            document: STOCK_SUBSCRIPTION,
            updateQuery: (prev,{subscriptionData})=>{
                console.log("stock platform subscription: ",subscriptionData.data.stockcontent.data);
                console.log("prev: ",prev)
                if(!subscriptionData) return prev
                const newStock = subscriptionData.data.stockcontent.data
                return{
                    ...prev,
                    stockcontent: [...prev.stockcontent,newStock]
                }
            }
        })
    },[subscribeToMore])
    const handleNameorNumber = (e) => {
        setStockName(e.target.value);
    }

    const handleNumber = (e) =>{

        setStockNumber(e.target.value);
    }

    const handlePrice = (e) =>{
        setStockPrice(e.target.value);
    }
    const handleBuyorSell = (e) =>{
        setStockBuyorSell(e.target.value)
    }
    const handleDate = (e) =>{
        handleDateChange(e.target.value);
    }
    const handleHistory = useCallback((e) => {        
        history.push("/stock_platform/Deal")
        
    })
    let tmpdate = selectedDate.toString();
    var detailDate = new Date();
    detailDate = detailDate.getFullYear() + "-" + `0${detailDate.getMonth()+1}` + "-" + detailDate.getDate();
    console.log(detailDate);
    
    //var date = new Date();
    //let defaultDate = date.yyyymmdd();
    //console.log('default: ',defaultDate);
    /*
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(buyorsell === "buy"){
            setStockBuyorSell("Buy this stock");
        }
        else if(buyorsell === "cell"){
            setStockBuyorSell("Cell this stock")
        }
        setDeal(true);
    }*/

    //console.log(stockname,stocknumber,stockprice,buyorsell);

    const handleSubmit = useCallback((e)=>{
        e.preventDefault();
        addStock({
            variables:{
                Name:useContextName,
                stockName: stockname,
                stockNumber: stocknumber,
                stockPrice: stockprice,
                BuyorSell: buyorsell,
                fullDate: detailDate,

            }
        })
        setStockName('');
        setStockNumber('');
        setStockPrice('');
        setStockBuyorSell('buy');
        handleDateChange('');
        setDeal(true)
    },[addStock,useContextName,stockname,stocknumber,stockprice,buyorsell,fullDate])
    console.log("BuyorSell: ",buyorsell);
    /*let stockinplotform = {"Name":useContextName,"stockName":stockname,"stockNumber":stocknumber,"stockPrice":stockprice,"BuyorSell":buyorsell}
    stocksomethin = createContext(stockinplotform);*/
    console.log("Date of calander: ",tmpdate);
    /*yourDate = createContext(selectedDate.getDate());
    yourMonth = createContext(selectedDate.getMonth());
    yourYear = createContext(selectedDate.getFullYear());*/
    
    
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <li className="navbar-brand active">
                歡迎來到 {useContextName} 日常收支表
            </li>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    
                    <li className="nav-item active">
                    <To_Deal/>
                    </li>
                    <li className="nav-item active">
                    <Stock_AuthButton/>
                    </li>
                    
                    
                    
                </ul>
            </div>
        </nav>
        
        <form className={classes.root} noValidate autoCapitalize="off" onSubmit={handleSubmit} style={{backgroundColor: "ffff00"}} >
            <div>
                <NameandNumberTextField
                    className={classes.marginInFirstTwoItem}
                    label="花費/進帳 項目"
                    variant="outlined"
                    id="custom-css-outlined-input"
                    onChange={handleNameorNumber}                
                />
            </div>
            
            <div>
                <NameandNumberTextField
                    className={classes.marginInFirstTwoItem}
                    label="食衣住行其他"
                    variant="outlined"
                    id="custom-css-outlined-input"
                    onChange={handleNumber}
                />
            </div>
            
            <div>
                <PriceTextField
                    className={classes.marginInPrice}
                    label="價格"
                    variant="outlined"
                    id="custom-css-outlined-input"
                    type="number"
                    min="0"
                    step="0.01"
                    onChange={handlePrice}
                />
            </div>
            
                <TextField
                    id="date"
                    label="Accounting Book"
                    type="date"
                    defaultValue={detailDate}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    onChange={handleDate}
            
      />
            <div>
            </div>

            <div>
                
                <RadioGroup row aria-label="quiz" name="quiz" value={buyorsell} onChange={handleBuyorSell}>
                    <FormControlLabel value="buy" control={<Radio />} label="支出" className={classes.buyradio} />
                    <FormControlLabel value="sell" control={<Radio />} label="收入" className={classes.sellradio} />
                </RadioGroup>
                
                
            </div>
            
            <div>
                {/*
                {deal?(
                    
                    <DealBuyButton type="submit" variant="outlined" color="primary" onClick={handleHistory} >
                        成交
                    </DealBuyButton>
                    
                   

                ):(
                <>
                <DealSellButton type="submit" variant="outlined" color="primary">
                    成交
                </DealSellButton>
                <p>{dealmsg}</p>
                </>
                */}
                { deal ? (
                    <DealBuyButton type="submit" variant="outlined" color="primary" >
                        交易
                    </DealBuyButton> 
                ) : (
                    <DealSellButton type="submit" variant="outlined" color="primary">
                        交易
                    </DealSellButton>
                )}
                
                
                
            </div>
             
        </form>
        </>
    )
}