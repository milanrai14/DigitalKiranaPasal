import axios from 'axios'

const API = axios.create({
    baseURL : "http://localhost:3000/api", 
    headers : {
        "Content-Type" : "application/json", 
        "Accept" : "application/json" 
    }
})

//use this api if the token is needed
const APIWITHTOKEN = axios.create({
    baseURL : 'http://localhost:3000/api',
    headers : {
        'Content-Type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `${localStorage.getItem('tokenHoYo')}`  //for the token
        
    }


})

export {API,APIWITHTOKEN}