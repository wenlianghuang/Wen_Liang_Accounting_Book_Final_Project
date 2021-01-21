import {gql} from 'apollo-boost';

export const CREATE_STOCK_MUTATION = gql`
    mutation createStock(
        $Name: String
        $stockName: String!
        $stockNumber: String!
        $stockPrice: String!
        $BuyorSell: String!
        $fullDate: String
    ){
        createStock(
            data:{
                Name: $Name
                stockName: $stockName
                stockNumber: $stockNumber
                stockPrice: $stockPrice
                BuyorSell: $BuyorSell
                fullDate: $fullDate
            }
        ){
            Name
            stockName
            stockNumber
            stockPrice
            BuyorSell
            fullDate
        }
    }
`