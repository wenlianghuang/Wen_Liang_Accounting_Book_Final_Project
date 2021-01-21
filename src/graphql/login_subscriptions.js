import {gql} from 'apollo-boost';

export const LOGIN_SUBSCRIPTION = gql`
    subscription{
        loginuser{
            mutation
            data{
                name
                email
                password
                total_money
            }
        }
    }
`