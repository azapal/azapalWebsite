import axios from "axios";
// import router from "../router";

// https://accountdev.ennovatingx.com/api/v1/account/
const baseAzapal =  "http://127.0.0.1:8000/api/v1"
const baseAccount =  "http://127.0.0.1:10000/api/v1"
const basePayment =  "http://127.0.0.1:9000/api/v1"

// const baseAzapal =  "https://azapal.pythonanywhere.com/api/v1/"
// const baseAccount =  "https://xaccount.pythonanywhere.com/api/v1"
// const basePayment =  "https://accountdev.ennovatingx.com/api/v1/account/"

export const accountClient = axios.create({
    baseURL: `${baseAccount}/account/`,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});

export const walletClient = axios.create({
    baseURL: `${basePayment}/payment/`,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});


export const businessClient = axios.create({
    baseURL: `${baseAzapal}/azapal/`,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});


export const appClient1 = axios.create({
    baseURL: "BASE_URL",
    withCredentials: false,
    headers: {
         //Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});

// account
accountClient.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
        config.headers.Authorization = localStorage?.token; // Default value if not provided
    }    return config
})

accountClient.interceptors.response.use(response => {
    
    return response
});

//wallet
walletClient.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
        config.headers.Authorization = localStorage?.token; // Default value if not provided
    }    return config
})

walletClient.interceptors.response.use(response => {
    
    return response
});

//business
businessClient.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
        config.headers.Authorization = localStorage?.token; // Default value if not provided
    }    return config
})

businessClient.interceptors.response.use(response => {
    
    return response
});

export const imageAccountUploadClient = axios.create({
    baseURL:`${baseAccount}/account/`,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
    }
});

export const businessImageUploadClient = axios.create({
    baseURL:`${baseAzapal}/azapal/`,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
    }
});

imageAccountUploadClient.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.token;
    return config
})

imageAccountUploadClient.interceptors.response.use(response => {

    return response
});

businessImageUploadClient.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.token;
    return config
})

businessImageUploadClient.interceptors.response.use(response => {

    return response
});





export const apiClient = {
    accountClient: accountClient,
    walletClient: walletClient,
    businessClient:businessClient,
    imageAccountUploadClient: imageAccountUploadClient,
    businessImageUploadClient: businessImageUploadClient
}
  