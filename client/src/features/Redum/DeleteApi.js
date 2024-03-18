import { useDispatch } from "react-redux"
import instance from "../../../utils/Proxy"
import {toast} from "react-toastify"
export const redumDeleteApi=(id)=>{
    console.log("Top stage")
    return (new Promise(async (resolve, reject)=>{
        
        try{
            
           console.log("Before response")
            const response=await instance.delete(`/contactObject/record/${id}`,{headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${sessionStorage.getItem("access_token")}`,
                "instance_url":`${sessionStorage.getItem("instance_url")}`
            }});
            console.log("After Response")
            console.log(response);


            if(response.status == 204) {
            return resolve(response)
            }
            
            throw new Error(response);
        }
        catch(e){
            reject(e.response.data);


        }

    }))
}

