const express = require('express');
const {
  createSalesforceRecordController,
  fetchAllSalesforceRecordDataController,
  fetchDataByIdSalesforceRecordController,
  updateDataByIdSalesforceRecordController,
  deleteDataByIdSalesforceRecordController,
  templateAccountController
} = require('../controller/accountController.js');

const router = express.Router();

router.route('/createRecord').post(createSalesforceRecordController);

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
module.exports = router;
