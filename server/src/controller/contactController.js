const instance = require("../utils/Proxy");
const ApiError = require("../utils/ApiError");

const createSalesforceContact = async (req, res, next) => {
    try {
        console.log(req.body);
        const recordData = await instance.post("/services/data/v35.0/sobjects/Contact", req.body);
        return res.status(200).send(recordData.data);
    } catch (e) {
        next(new ApiError("Can't create new contact", 404));
    }
}

const fetchAllContacts = async (req, res, next) => {
    try {
        const { id } = req.params
        const recordData = await instance.get(`/services/data/v35.0/query/?q=SELECT%20Id,%20Name,%20Email,%20Phone%20FROM%20Contact%20WHERE%20AccountId%20=%20%27${id}%27`);
        return res.status(200).send(recordData.data);
    } catch (e) {
        console.log(e)
        next(new ApiError("Can't fetchAll contacts", 404));
    }
};


const fetchByIdContact = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(id)

        const recordData = await instance.get(`/services/data/v35.0/sobjects/Contact/${id}`);
        return res.status(200).json(recordData.data);
    } catch (e) {

        console.log("DSKFKJF")
        next(new ApiError("Can't fetchById Contacts", 404));
    }
};

const updateByIdContact = async (req, res, next) => {

    try {
        const { id } = req.params
        console.log(id);
        const recordData = await instance.patch(`/services/data/v35.0/sobjects/Contact/${id}`, req.body);

        return res.status(200).json(recordData.data);

    }
    catch (e) {
        res.status(400).json(e);

    }
}

const deleteByIdContact = async (req, res, next) => {
    try {
        const recordData = await instance.delete(`/services/data/v35.0/sobjects/Contact/${req.params.id}`);
        return res.status(200).json({ message: "data has been deleted" });
    }
    catch (e) {
        next(new ApiError("Can't delete account because assigned with undeleted contact object", 404));


    }

}

module.exports = {
    createSalesforceContact,
    fetchAllContacts,
    fetchByIdContact,
    updateByIdContact,
    deleteByIdContact
}