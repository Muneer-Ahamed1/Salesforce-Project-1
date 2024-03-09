const axios=require("axios");

module.exports=  axios.create({
    baseURL:"https://d5j00000drpgveaj-dev-ed.develop.my.salesforce.com",
    Headers:{
        "Authorization":`Bearer 00D5j00000DrpGv!ARcAQA5JZGVsUu4qSC9JL.lkzTPKF77fOrEHaerj_nT7qOzcR4AEobcThoUi9rz3RIM55zSJHlnrhoD3lCff8363U2WW_xan`
    }

})