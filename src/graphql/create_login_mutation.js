import {gql} from 'apollo-boost';

export const CREATE_LOGIN_MUTATION = gql`
    mutation createLogIn(
        $name: String!
        $email: String!
        $password: String!
        $total_money: String
    ){
        createLogIn(
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