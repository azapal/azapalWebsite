import axios from "axios";

export const client = axios.create({
    baseURL: ``,
    withCredentials: false,
    headers: {
         Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
});


// client
client.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
        config.headers.Authorization = localStorage?.token; // Default value if not provided
    }    return config
})

client.interceptors.response.use(response => {

    return response
});


export const imageUploadClient = axios.create({
    baseURL:``,
    withCredentials: false,
    headers: {
        Accept: "application/json",
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
    }
});


imageUploadClient.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.token;
    return config
})

imageUploadClient.interceptors.response.use(response => {

    return response
});



export const apiClient = {
    client: client,
}
  