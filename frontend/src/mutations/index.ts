export const REGISTER_MUTATION = `mutation RegisterUser($username: String!, $email: String!, $password: String!) {
    createUser(input: {username: $username, email: $email, password: $password}){
      username
    }
  }`;
