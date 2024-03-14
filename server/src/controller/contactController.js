const instance = require("../utils/Proxy");
const ApiError = require("../utils/ApiError");
const axios=require("axios");


const createSalesforceContact = async (req, res, next) => {
    try {
        const { authorization, instance_url } = req.headers;
        
        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }
        console.log(authorization)
        console.log(instance_url) 

        const response = await axios.post(
            `${instance_url}/services/data/v35.0/sobjects/Contact`,req.body,{
                headers:{
                    Authorization: `${authorization}`
                }
            }
        );
        console.log(response.status);
        if(response.status==201) {

        return res.status(200).json(response.data);
        }
        throw new Error(response);
    } catch (error) {

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
        
        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }
        console.log(authorization)
        console.log(instance_url) 

        const response = await axios.get(
            `${instance_url}/services/data/v35.0/sobjects/Contact/${id}`,{
                headers:{
                    Authorization: `${authorization}`
                }
            }
        );
        console.log(response.status);
        if(response.status==200) {

        return res.status(200).json(response.data);
        }
        throw new Error(response);
    } catch (error) {

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
        const { authorization, instance_url } = req.headers;
        const {id}=req.params;
        
        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }
        console.log(id);
        console.log(authorization)
        console.log(instance_url) 
        for(let i in req.body) {
            if(req.body[i].length==0) {
                delete req.body[i];
            }
        }
        delete req.body["IsEmailBounced"]
        delete req.body["Name"];
        delete req.body["Id"];
        if(! req.body["LastName"] || !req.body["FirstName"] || !req.body["Salutation"]) {
            res.status(400).json({message:"Bad Request"});
        }

        const response = await axios.patch(
            `${instance_url}/services/data/v35.0/sobjects/Contact/${id}`,req.body,{
                headers:{
                    Authorization: `${authorization}`,
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response);
        if(response.status == 204) {

        return res.status(204).json({ message: "data has been Updated" });
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
        console.log(response);
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

const templateContactController = async (req, res, next) => {
    try {
        const { authorization, instance_url } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `${authorization}`
        };

        const response = await axios.get(`${instance_url}/services/data/v54.0/sobjects/Contact/describe`, { headers });

        if (response.status === 200) {
           
            return res.status(200).json(response.data);
        }

        console.error(response.status, response.statusText);
        res.status(response.status).json({
            error: `Error calling Salesforce API: ${response.statusText}`
        });
    } catch (error) {
        console.error(error);

        if (error.response) {
            const { status, statusText } = error.response;

            if (status === 404) {
                return res.status(404).json({ message: "Can't delete contact because assigned with undeleted account object" });
            }

            res.status(status).json({
                statusText: statusText,
                status: status
            });
        } else {
            next(new Error(error.message));
        }
    }
};

module.exports = {
    createSalesforceContact,
    fetchAllContacts,
    fetchByIdContact,
    updateByIdContact,
    deleteByIdContact,
    templateContactController
}