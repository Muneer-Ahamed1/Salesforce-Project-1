const { json } = require('express');
const instance = require('../utils/Proxy.js');
const axios = require("axios");


const createSalesforceRecordController = async (req, res, next) => {
    try {
        const { authorization, instance_url } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        delete req.body["Id"];

        for(let i in req.body){
            if(req.body[i].length==0) {
            delete req.body[i];
            }

        }
        console.log(authorization)
        console.log(instance_url);
        console.log(req.body);

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `${authorization}`
        };

        const recordData = await axios.post(`${instance_url}/services/data/v35.0/sobjects/Account`, req.body, { headers });

        return res.status(204).json(recordData.data);
    } catch (error) {
        if (error.response) {
            const { status, statusText } = error.response;
            res.status(status).json({
                statusText: statusText,
                status: status
            });
        } else {
            // Handle other types of errors (e.g., network errors)
            next(new Error(error.message));
        }
    }
};



const fetchAllSalesforceRecordDataController = async (req, res, next) => {
    try {
        const { authorization, instance_url } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }
        console.log(authorization)
        console.log(instance_url)

        const recordData = await axios.get(`${instance_url}/services/data/v35.0/query/?q=SELECT+Id,Name,Site,Phone,OwnerId+FROM+Account`
            , {
                headers: {
                    Authorization: `${authorization}`
                }
            });
        console.log(recordData);

        if (recordData.status == 200) {
            return res.status(200).json(recordData.data);
        } else {

            throw new Error(`Failed to fetch Salesforce records. Status: ${recordData.status}`);
        }
    } catch (error) {
        console.log(error);

        if (error.response) {
            const { status, statusText } = error.response;
            res.status(status).json({
                statusText: status,
                status: statusText
            })
        }
    }
};



const fetchDataByIdSalesforceRecordController = async (req, res, next) => {
    try {
        const { authorization, instance_url } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        console.log(req.params.id);
        console.log(req.body)

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `${authorization}`
        };

        const recordData = await axios.get(`${instance_url}/services/data/v35.0/sobjects/Account/${req.params.id}`, { headers });
        console.log(recordData);

        return res.status(200).json(recordData.data);
    } catch (error) {

        if (error.response) {
            const { status, statusText } = error.response;
            res.status(status).json({
                statusText: statusText,
                status: status
            });
        } else {
            // Handle other types of errors (e.g., network errors)
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};



const updateDataByIdSalesforceRecordController = async (req, res, next) => {
    try {
        const { authorization, instance_url } = req.headers;
        const{id}=req.params;
        

        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `${authorization}`
        };
        console.log(instance_url)
        console.log(authorization)
        console.log(id)
        console.log(req.body);


        const recordData = await axios.patch(`${instance_url}/services/data/v35.0/sobjects/Account/${req.params.id}`, req.body, { headers });

        return res.status(200).json(recordData.data);
    } catch (error) {
        if (error.response) {
            const { status, statusText } = error.response;
            res.status(status).json({
                statusText: statusText,
                status: status
            });
        } else {
            // Handle other types of errors (e.g., network errors)
            next(new Error(error.message));
        }
    }
};



const deleteDataByIdSalesforceRecordController = async (req, res, next) => {
    try {
        const { authorization, instance_url } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `${authorization}`
        };

        await axios.delete(`${instance_url}/services/data/v35.0/sobjects/Account/${req.params.id}`, { headers });

        return res.status(200).json({ message: "Data has been deleted" });
    } catch (error) {
        if (error.response) {
            const { status, statusText } = error.response;

            // Handle specific error cases (e.g., handle 404 Not Found differently)
            if (status === 404) {
                return res.status(404).json({ message: "Can't delete account because assigned with undeleted contact object" });
            }

            res.status(status).json({
                statusText: statusText,
                status: status
            });
        } else {
            // Handle other types of errors (e.g., network errors)
            next(new Error(error.message));
        }
    }
};

const templateAccountController = async (req, res, next) => {
    try {
        const { authorization, instance_url } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `${authorization}`
        };

        const response = await axios.get(`${instance_url}/services/data/v54.0/sobjects/Account/describe`, { headers });

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
                return res.status(404).json({ message: "Can't delete account because assigned with undeleted contact object" });
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
const OwnerShipController=async (req,res,next)=>{

    try {
        const { authorization, instance_url } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `${authorization}`
        };

        const response = await axios.get(`${instance_url}/services/data/v52.0/query?q=SELECT+Id,Name+FROM+User`, { headers });

        if (response.status === 200) {
           
            return res.status(200).json(response.data);
        }

        console.error(response.status, response.statusText);
        res.status(response.status).json({
            error: `Error calling Salesforce API: ${response.statusText}`
        });
    } catch (error) {

        if (error.response) {
            const { status, statusText } = error.response;

            if (status === 404) {
                return res.status(404).json({ message: "SOmething wrong in OwnerShip Api" });
            }

            res.status(status).json({
                statusText: statusText,
                status: status
            });
        } else {
            next(new Error(error.message));
        }
    }

}





module.exports = {
    createSalesforceRecordController,
    fetchAllSalesforceRecordDataController,
    fetchDataByIdSalesforceRecordController,
    updateDataByIdSalesforceRecordController,
    deleteDataByIdSalesforceRecordController,
    templateAccountController,
    OwnerShipController
};
