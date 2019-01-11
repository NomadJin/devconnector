import axios from 'axios';
import { GET_ERRORS } from "./types";

// Register User
export const registeruser = (userData, history) => dsipatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dsipatch({
                type: GET_ERRORS,
                payload: err.response.data
            })    
        );
};