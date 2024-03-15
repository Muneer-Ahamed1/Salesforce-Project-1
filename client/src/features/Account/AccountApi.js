import { useDispatch } from "react-redux";
import instance from "../../../utils/Proxy";
export const fetchAllRecordApi = (count=0) => {
    const MAX_COUNT=3;
    return new Promise(async (resolve, reject) => {
        try {
            const fetchAccountData = await instance.get("/accountObject/getAllData", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                    "instance_url": `${sessionStorage.getItem("instance_url")}`
                }
            })
            return resolve(fetchAccountData);

        }
        catch (e) {
            if(count<MAX_COUNT) {
            fetchAllRecordApi(++count);
            }
            reject(e);

        }

    })
}

export const deleteRecordByIdApi = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                const deleteRecordById = await instance.delete(`/accountObject/record/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                        "instance_url": `${sessionStorage.getItem("instance_url")}`
                    }
                });
                return resolve(deleteRecordById);
            }
            reject({ message: "Please provide an id" });
        }

        catch (e) {
            reject(e);

        }
    })
}

export const createRecordApi = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("TOP LINE please check")
            console.log(data);
            const response = await instance.post("/accountObject/createRecord", data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                    "instance_url": `${sessionStorage.getItem("instance_url")}`
                }
            });
            console.log("JUST STARTED TO DEBUG")
            console.log(response);

            if (response.status == 204) {
                return resolve(response);
            }
            throw new Error(response);
        }
        catch (e) {

            console.log(e);

            reject(e.response?.data);
        }
    })

}

export const fetchRecordApiByIdApi = (id,count=0) => {
const MAX_COUNT = 3;
    return new Promise(async (resolve, reject) => {
        try {
            const response = await instance.get(`/accountObject/record/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                    "instance_url": `${sessionStorage.getItem("instance_url")}`
                }
            })
            if (response.status == 200) {
                return resolve(response);
            }
            throw new Error(response);
        }
        catch (e) {

            console.log(e);
            if(count<MAX_COUNT){
            fetchRecordApiByIdApi(id,++count);
             } 
             return reject(e);

        }
    })
}
export const updateRecordById = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await instance.patch(`/accountObject/record/${id}`, data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                    "instance_url": `${sessionStorage.getItem("instance_url")}`
                }
            });


            if (response.status === 200) {
               return resolve(response.data);
            } else {
                throw new Error(response);
            }
        } catch (e) {
            reject(e.response.data);
        }
    });
};

export const templateAccountApi = (count=0) => {

    return (new Promise(async (resolve, reject) => {
        try {
            const response = await instance.get(`/accountObject/describe`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                    "instance_url": `${sessionStorage.getItem("instance_url")}`
                }
            })

            if (response.status) {
                return resolve(response);
            }
            throw new Error('Network error');
        }
        catch (e) {
            templateAccountApi(++count);
            
            reject(e);
        }
    }))
}

export const ownerShipApi = (count=0) => 
{
    const MAX_COUNT=3;

    return (new Promise(async (resolve, reject) => {
        
        try{
        const response = await instance.get(`/accountObject/ownerShip`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                "instance_url": `${sessionStorage.getItem("instance_url")}`
            }
        })
        if (response.status == 200) {
            return resolve(response);
        }
        throw new Error(response);
        }
    catch (e) {
        if(count<MAX_COUNT) {
        ownerShipApi(++count);
        }
        reject(e);

    }


}))
}

