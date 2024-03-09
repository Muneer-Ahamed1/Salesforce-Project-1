const axios =require("axios");
const ApiError=require("../utils/ApiError");
const qs=require("qs");
const userLogin=async (req,res,next)=>{
    try{
        const {code,grant_type,client_id,client_secret,redirect_uri}=req.body;

        const formData=qs.stringify({
            code:code,
            grant_type:grant_type,
            client_id:client_id,
            client_secret:client_secret,
            redirect_uri:redirect_uri
        })
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
          };
        console.log(formData);
        const userData=await axios.post("https://login.salesforce.com/services/oauth2/token",formData,headers)
        const option = {
            maxAge: 3600000,
            httpOnly: true,
            secure:true,
            sameSite: 'None', // Adjust based on your requirements

        }
        console.log(userData.data);

        res.cookie('access_token',userData.data.access_token,option);
        res.cookie('refresh_token',userData.data.refresh_token,option);
        res.cookie('instance_url',userData.data.instance_url);
        
        return res.status(200).json({
            status:200,
            data:userData.data});
    }

    catch (error) {

        if (error.response) {
            
            const { status, data } = error.response;
            return res.status(status).json({status:status, error: 'Axios Error', details: data });
        } else if (error.request) {
            return res.status(500).json({ staus:500,error: 'Axios Error', details: 'No response received from the server' });
        } else {
            return res.status(500).json({ status:500,error: 'Axios Error', details: 'Unexpected error during the request' });
        }
    }
}

const user_RefreshToken = async (req, res, next) => {
    try {
        const { grant_type, client_id, client_secret, refresh_token } = req.body;

        const formData = qs.stringify({
            grant_type: grant_type,
            client_id: client_id,
            client_secret: client_secret,
            refresh_token: refresh_token
        });

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const userData = await axios.post("https://login.salesforce.com/services/oauth2/token", formData, { headers });

        return res.status(200).json(userData.data);
    } catch (error) {
        console.error('Axios error:', error);

        if (error.response) {
            
            const { status, data } = error.response;
            return res.status(status).json({ error: 'Axios Error', details: data });
        } else if (error.request) {
            return res.status(500).json({ error: 'Axios Error', details: 'No response received from the server' });
        } else {
            return res.status(500).json({ error: 'Axios Error', details: 'Unexpected error during the request' });
        }
    }
};


module.exports={userLogin,user_RefreshToken};