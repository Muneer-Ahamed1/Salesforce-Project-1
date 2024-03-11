const instance = require("../utils/Proxy");
const ApiError = require("../utils/ApiError");
const axios=require("axios");

const createSalesforceContact = async (req, res, next) => {
    try {
        console.log(req.body);
        const recordData = await instance.post("/services/data/v35.0/sobjects/Contact", req.body);
        return res.status(200).send(recordData.data);
    } catch (e) {
        next(new ApiError("Can't create new contact", 404));
    }
}

const fetchAllContacts = async (req, res, next) => {
    try {
        const { authorization, instance_url } = req.headers;
        const {id}=req.params;
        
        console.log(id)
        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }
        console.log(authorization)
        console.log(instance_url)       
         const recordData =  await axios.get(`${instance_url}/services/data/v35.0/query/?q=SELECT%20Id,%20Name,%20Email,%20Phone%20FROM%20Contact%20WHERE%20AccountId%20=%20%27${id}%27`, {headers: {
            Authorization: `${authorization}`
        }});
        console.log(recordData.status);
         

        if (recordData.status == 200) {
            return res.status(200).json(recordData.data);
        } else {

            throw new Error(`Failed to fetch Salesforce records. Status: ${recordData.status}`);
        }
    } catch (error) {

        if (error.response) {
            const { status, statusText } = error.response;
            res.status(status).json({
                statusText: status,
                status: statusText
            })
        }
    }
};



const fetchByIdContact = async (req, res, next) => {
    try {
        const { authorization, instance_url } = req.headers;
        const {id}=req.params;
        
        console.log(req.body)
        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }
        console.log(authorization)
        console.log(instance_url) 

        const response = await axios.get(
            `${instance_url}/services/data/v35.0/sobjects/Contact/${id}`
        );
        if(response.status==200) {

        return res.status(response.status).json(response.data);
        }
        throw new Error(response);
    } catch (error) {
        console.error(error);

        if (error.response) {
            // Handle axios-related errors
            const { status, statusText } = error.response;
            res.status(status).json({
                statusText: status,
                status: statusText
            });
        } else {
            // Handle other types of errors here
            next(new ApiError("Can't fetchById Contacts", 404));
        }
    }
};


const updateByIdContact = async (req, res, next) => {

    try {
        const { id } = req.params
        console.log(id);
        const recordData = await instance.patch(`/services/data/v35.0/sobjects/Contact/${id}`, req.body);

        return res.status(200).json(recordData.data);

    }
    catch (e) {
        res.status(400).json(e);

    }
}

const deleteByIdContact = async (req, res, next) => {
    try {
        const { authorization, instance_url } = req.headers;
        const {id}=req.params;
        
        console.log(req.body)
        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }
        console.log(id);
        console.log(authorization)
        console.log(instance_url) 

        const response = await axios.delete(
            `${instance_url}/services/data/v35.0/sobjects/Contact/${id}`,{
                headers:{
                    Authorization: `${authorization}`
                }
            }
        );
        console.log(response.status);
        if(response.status == 204) {

        return res.status(204).json({ message: "data has been deleted" });
        }
    } catch (error) {

        if ( error.response) {
            // Handle axios-related errors
            const { status, statusText } = error.response;
            res.status(status).json({
                statusText: status,
                status: statusText
            });
        } else {
            // Handle other types of errors here
            next(new ApiError("Can't delete account because assigned with undeleted contact object", 404));
        }
    }
};

module.exports = {
    createSalesforceContact,
    fetchAllContacts,
    fetchByIdContact,
    updateByIdContact,
    deleteByIdContact
}