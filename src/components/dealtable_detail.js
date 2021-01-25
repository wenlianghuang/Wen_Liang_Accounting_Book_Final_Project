import { makeStyles } from '@material-ui/core/styles';
const columns = [
    { 
        id: 'name', 
        label: 'Name',
        align: 'center', 
        minWidth: 50 },
    { 
        id: 'stock_Name', 
        label: 'Expenditure/Income', 
        align: 'center',
        minWidth: 150 },
    {
      id: 'stock_Number',
      label: 'Type',
      align: 'center',
      minWidth: 70,
      //format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'stock_Price',
      label: 'Price',
      minWidth: 100,
      align: 'center',
      //format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'Buy_or_Sell',
      label: 'Buy or Sell',
      minWidth: 70,
      align: 'center',
      //format: (value) => value.toFixed(2),
    },
    {
      id: 'implement_date',
      label: 'Date',
      minwidth: 200,
      align: 'center',
    }
]


const useDealStyles = makeStyles({
    root: {
      width: '100vw',
      top: '500px',
      
    },
    container: {
      maxHeight: 440,
      justifyContent: 'center',
    },
    paperbutton:{
      width: '30%',
      display: 'flex',
    },
    pageStyle:{
        height: '100vh',
        backgroundColor: '#ffb3d9',
    
    }
  });
export {columns,useDealStyles}