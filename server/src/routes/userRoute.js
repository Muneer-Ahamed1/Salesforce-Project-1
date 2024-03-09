const router=require("express").Router();
const {userLogin,user_RefreshToken}=require("../controller/userController");

router.route("/login")
.post(userLogin)

router.route("/refreshToken")
.post(user_RefreshToken)



module.exports=router;