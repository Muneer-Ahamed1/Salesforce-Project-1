function isNumber(str) {
    return !isNaN(Number(str));
}

const accountMiddleware = (req, res, next) => {
    let errorValidation = {
        status: false,
        Name: {
            status: false,
            message: ""
        },
        AccountNumber: {
            status: false,
            message: ""
        },
        AnnualRevenue:{
            status:false,
            message: ""
        },
        NumberOfEmployees:{
            status:false,
            message: ""
        },
        Sic:{
            status:false,
            message: ""
            
        },
       
    };
console.log("I AM ACCOUNT MIDDLEWARE")
    console.log(req.body);

    if (!req.body) {
        return res.status(400).json({ message: "Please fill in all fields in the account" });
    }

    if (!req.body["Name"]) {
        errorValidation["status"] = true;
        errorValidation["Name"]["status"] = true;
        errorValidation["Name"]["message"] = "Please Provide a Name";
    }

   
    if (req.body["AnnualRevenue"]?.length>0 && isNaN(req.body["AnnualRevenue"])) {
        errorValidation["status"] = true;
        errorValidation["AnnualRevenue"]["status"] = true;
        errorValidation["AnnualRevenue"]["message"] = "Please Provide a valid Annual Revenue";
    }
    if (req.body["NumberOfEmployees"]?.length>0 && isNaN(req.body["NumberOfEmployees"])) {
        errorValidation["status"] = true;
        errorValidation["NumberOfEmployees"]["status"] = true;
        errorValidation["NumberOfEmployees"]["message"] = "Please Provide a valid NumberOfEmployees";
    }
    if (req.body["Sic"]?.length>0 && isNaN(req.body["Sic"])) {
        errorValidation["status"] = true;
        errorValidation["Sic"]["status"] = true;
        errorValidation["Sic"]["message"] = "Please Provide a valid Sic";
    }
    
    
    

 

    console.log(errorValidation);

    if (errorValidation["status"]) {
        return res.status(400).json(errorValidation);
    } 
    
    console.log("SSDDS");

        req.body = req.body;
        next();
    
}

module.exports = { accountMiddleware };
