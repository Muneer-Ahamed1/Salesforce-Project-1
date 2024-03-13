const express = require('express');
const {
  createSalesforceRecordController,
  fetchAllSalesforceRecordDataController,
  fetchDataByIdSalesforceRecordController,
  updateDataByIdSalesforceRecordController,
  deleteDataByIdSalesforceRecordController,
  templateAccountController,
  OwnerShipController
} = require('../controller/accountController.js');
const {accountMiddleware}=require("../middleware/account.js");


const router = express.Router();

router.route('/createRecord').post(accountMiddleware,createSalesforceRecordController);

router
  .route('/record/:id')
  .get(fetchDataByIdSalesforceRecordController)
  .patch(updateDataByIdSalesforceRecordController)
.delete(deleteDataByIdSalesforceRecordController);

router.route('/getAllData').get(fetchAllSalesforceRecordDataController);

router.route('/test').get((req, res) => {
  return res.send('Hello').status(200);
});
router.route("/describe").get(templateAccountController);
router.route("/ownerShip").get(OwnerShipController);
module.exports = router;
