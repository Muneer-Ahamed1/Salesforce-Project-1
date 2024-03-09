const {
    createSalesforceContact,
    fetchAllContacts,
    fetchByIdContact,
    updateByIdContact,
    deleteByIdContact
}=require("../controller/contactController");

const router=require("express").Router();

router.route("/createContacts").post(createSalesforceContact);
router.route("/fetchAllContacts/:id").get(fetchAllContacts);
router.route("/record/:id")
.get(fetchByIdContact)
.delete(deleteByIdContact)
.patch(updateByIdContact);


module.exports=router;