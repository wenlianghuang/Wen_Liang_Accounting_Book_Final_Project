import {gql} from 'apollo-boost';

export const STOCK_SUBSCRIPTION = gql`
    subscription{
        stockcontent{
            mutation
            data{
                Name
                stockName
                stockNumber
                stockPrice
                BuyorSell
                fullDate
            }
        }
    }
`