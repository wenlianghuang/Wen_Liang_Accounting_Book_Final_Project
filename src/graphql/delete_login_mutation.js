import {gql} from 'apollo-boost';

export const DELETE_LOGIN_MUTATION = gql`
    mutation deleteLogIn(
        $name: String!
    ){
        deleteLogIn(
            name: $name   
        ){
            name
            email
            password
            total_money
        }
    }
`