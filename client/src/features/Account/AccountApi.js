import instance from "../../../utils/Proxy";
export const fetchAllRecordApi=()=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const fetchAccountData=await instance.get("/accountObject/getAllData",{headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${sessionStorage.getItem("access_token")}`,
                "instance_url":`${sessionStorage.getItem("instance_url")}`
            }})
            console.log(fetchAccountData)
            resolve(fetchAccountData);

        }
        catch(e){
            reject(e);

        }

    })
}

export const deleteRecordByIdApi=(id)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            if(id){
            const deleteRecordById=await instance.delete(`/accountObject/record/${id}`,{headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${sessionStorage.getItem("access_token")}`,
                "instance_url":`${sessionStorage.getItem("instance_url")}`
            }});
           return  resolve(deleteRecordById);
        }
        reject({message:"Please provide an id"});
    }

        catch(e){
            reject(e);

        }
    })
}

export const createRecordApi=(data)=>{
    return new Promise(async (resolve, reject) =>{
     try{
        const response=await instance.post("/accountObject/createRecord", data,{headers:{
            "Content-Type": "application/json",
            "Authorization":`Bearer ${sessionStorage.getItem("access_token")}`,
            "instance_url":`${sessionStorage.getItem("instance_url")}`
        }});  

        if(response.status==200) {
           return resolve(response);
        }
        throw new Error(response);
     }
     catch(e){
        reject(e);
     }
    })

}

export const fetchRecordApiByIdApi=(id)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const response=await instance.get(`/accountObject/record/${id}`,{headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${sessionStorage.getItem("access_token")}`,
                "instance_url":`${sessionStorage.getItem("instance_url")}`
            }})
        if(response.status==200) {
           return resolve(response);
        }
        throw new Error(response);
        }
        catch(e){
            reject(e);

        }
    })
}
export const updateByIdAPi=(id,data)=>{
    return(
        new Promise(async (resolve,reject)=>{
            try{
                const response=await instance.patch(`/accountObject/record/${id}`,data,{headers:{
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${sessionStorage.getItem("access_token")}`,
                    "instance_url":`${sessionStorage.getItem("instance_url")}`
                }})
            if(response.status==200) {
               return resolve(response);
            }
            throw new Error(response);
            }
            catch(e){
                reject(e);
    
            }
        })
    )

}

export const templateAccountApi=()=>{
    return(new Promise(async(resolve,reject)=>{
        try{
            const response=await instance.get(`/accountObject/describe`,{headers:{
                "Content-Type": "application/json",
                "Authorization":`Bearer ${sessionStorage.getItem("access_token")}`,
                "instance_url":`${sessionStorage.getItem("instance_url")}`
            }})
            
            if(response.status) {
                return resolve(response); 
        }
        throw new Error('Network error');
        }
        catch(e){
            reject(e);
        }
    }))
}

