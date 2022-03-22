import axios from "axios"

export function request(config){
 const  axiosobj = axios.create({
       baseURL:'https://lianghj.top:8888/api/private/v1/',
   })
   
   return axiosobj(config);
} 
axios.interceptors.request.use((config)=>{
  
    config.headers.Authorization = window.sessionStorage.getItem('token')
      return config
})