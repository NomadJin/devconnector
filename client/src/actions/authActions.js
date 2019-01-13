import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dsipatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err => 
            dsipatch({
                type: GET_ERRORS,
                payload: err.response.data
            })    
        );
};

export const loginUser = (userData) => dsipatch => {
    axios.post('/api/users/login', userData)
        .then(res => {  
            // Save to localStorage
            const { token } = res.data;
            // Set token ls
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dsipatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dsipatch({
                type: GET_ERRORS,
                payload: err.response.data
            })   
        );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}