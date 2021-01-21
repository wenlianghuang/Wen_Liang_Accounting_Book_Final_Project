import {gql} from 'apollo-boost';

export const UPDATE_LOGIN_MUTATION = gql`
    mutation updateLogIn(
        $name: String!
        $email: String!
        $password: String!
        $total_money: String
    ){
        updateLogIn(
            data:{
                name: $name
                email: $email
                password: $password
                total_money: $total_money
            }
        ){
            name
            email
            password
            total_money
        }
    }
`