import axios from "axios";
// import router from "../router";

// https://accountdev.ennovatingx.com/api/v1/account/
// http://127.0.0.1:8000/api/v1/account 

export const accountClient = axios.create({
    baseURL: `https://xaccount.pythonanywhere.com/api/v1/account/`,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});

export const walletClient = axios.create({
    baseURL: `https://accountdev.ennovatingx.com/api/v1/payment/`,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});


export const businessClient = axios.create({
    baseURL: `https://accountdev.ennovatingx.com/api/v1/azapal/`,
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






export const apiClient = {
    accountClient: accountClient,
    walletClient: walletClient,
    businessClient:businessClient
}
  