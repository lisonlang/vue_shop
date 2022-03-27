import axios from "axios"

export function request(config){
 const  axiosobj = axios.create({
       baseURL:'https://lianghj.top:8888/api/private/v1/',
   })
  //  axios拦截器
   axiosobj.interceptors.request.use((config)=>{
  
    config.headers.Authorization = window.sessionStorage.getItem('token')
    // console.log("ssss");
      return config
})
   return axiosobj(config);
} 
