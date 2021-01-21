import {gql} from 'apollo-boost';

export const STOCK_QUERY = gql`
    query{
        stockcontent{
            Name
            stockName
            stockNumber
            stockPrice
            BuyorSell
            fullDate
        }
    }
`