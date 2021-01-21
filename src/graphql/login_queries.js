import {gql} from 'apollo-boost';

export const LOGIN_QUERY = gql`
    query{
        loginuser{
            name
            email
            password
            total_money
        }
    }
`