import instance from "../../../utils/Proxy"
export const loginApi=(code)=>{
    return new Promise(async (resolve,reject)=>{
        try{
        if(code){
        
            const userData=await instance.post("/login",{
                code:code,
                client_id:'3MVG9pRzvMkjMb6l1H0ThA6FCQFWcvPbdUMz720Y6aqMS75NWxumufCiToTnLvvPqx0Lhcyh.1h0P1ZO9oHJ.',
                client_secret:'433883087F1891AC44D33F74A0DAA3D77919880C7DBDBB64B17592A4AF668B18',
                redirect_uri:'http://localhost:5173/metaData',
                grant_type:"authorization_code"
            })
            

            if(userData.status==200) {
               return resolve(userData);
            }
          return  reject(userData);
        

        }
        else{
            throw new Error({message:"No code is found"});
        }
    }

    catch(e){ 
        return reject(e);
    }
    })
}

export const abcDeleteApi=(id)=>{
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