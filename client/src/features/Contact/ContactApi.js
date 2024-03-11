import instance from "../../../utils/Proxy"
export const fetchAllContactById=(id)=>{
    return(new Promise(async (resolve,reject)=>{
        try{
            const response=await instance.get(`/contactObject/fetchAllContacts/${id}`,{headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${sessionStorage.getItem("access_token")}`,
                "instance_url":`${sessionStorage.getItem("instance_url")}`
            }});
            console.log(response);
            if(response.status == 200) {
            return resolve(response)
            }
            throw new Error(response);
        }
        catch(e){
            reject(e);


        }
    }))
}

export const deleteContactById=(id)=>{
    return (new Promise(async (resolve, reject)=>{
        try{
            const response=await instance.delete(`/contactObject/record/${id}`,{headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${sessionStorage.getItem("access_token")}`,
                "instance_url":`${sessionStorage.getItem("instance_url")}`
            }});
            console.log(response);
            if(response.status == 204) {
            return resolve(response)
            }
            throw new Error(response);
        }
        catch(e){
            reject(e);


        }

    }))
}