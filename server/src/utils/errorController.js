const errorController=(err,req,res,next)=>{
    const {message,status}=err;
    const statusCode=status||500;
    if(statusCode==500) {
        return res.status(statusCode).json({message:"Something went wrong"});
    }
    return res.status(statusCode).json({message:message});   
}

module.exports=errorController;