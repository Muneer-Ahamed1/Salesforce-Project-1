const {
    createSalesforceContact,
    fetchAllContacts,
    fetchByIdContact,
    updateByIdContact,
    deleteByIdContact,
    templateContactController
}=require("../controller/contactController");

const router=require("express").Router();

router.route("/createContacts").post(createSalesforceContact);
router.route("/fetchAllContacts/:id").get(fetchAllContacts);
router.route("/record/:id")
.get(fetchByIdContact)
.delete(deleteByIdContact)
.patch(updateByIdContact);
router.route("/describe").get(templateContactController);



module.exports=router;