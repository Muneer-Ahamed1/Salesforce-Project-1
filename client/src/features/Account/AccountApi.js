import instance from "../../../utils/Proxy";
export const fetchAllRecordApi = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const fetchAccountData = await instance.get("/accountObject/getAllData", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                    "instance_url": `${sessionStorage.getItem("instance_url")}`
                }
            })
            resolve(fetchAccountData);

        }
        catch (e) {
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

export const fetchRecordApiByIdApi = (id) => {
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
            reject(e);

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
                resolve(response.data);
            } else {
                throw new Error(response);
            }
        } catch (e) {
            reject(e.response.data);
        }
    });
};

export const templateAccountApi = () => {
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
            reject(e);
        }
    }))
}

export const ownerShipApi = () => {
    return (new Promise(async (resolve, reject) => {
        
        try{
        const response = await instance.get(`/accountObject/ownerShip`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`,
                "instance_url": `${sessionStorage.getItem("instance_url")}`
            }
        })
        console.log(response);
        if (response.status == 200) {
            return resolve(response);
        }
        throw new Error(response);
        }
    catch (e) {
        reject(e);

    }


}))
}

