const { registrationModel } = require('../Models/registration')
const qrcode = require('qrcode')


const registerNewCanidate = async (body) => {
    try {
        const doc = await new registrationModel({ name: body.name, items: body.items, college: body.college, department: body.department, email: body.email, phone: body.phone, event: body.event }).save()
        const qrCodeURL = await qrcode.toDataURL(doc._id)
        const updatedDoc = await registrationModel.findOneAndUpdate({ _id: doc._id }, { qrUrl: qrCodeURL }, { new: true })
        return updatedDoc
    } catch (err) {
        throw err
    }
}

const getAllCandidates = async (req) => {
    try {
        const registration = await registrationModel.find().sort(req.query)
        return registration
    } catch (err) {
        throw err
    }
}

const markRegistrationAsRead = async (req) => {
    try {
        const { id } = req.query
        console.log(id)
        const updatedDoc = await registrationModel.findOneAndUpdate({ _id: id }, { $set: { valid: false } }, { new: true })
        console.log(updatedDoc)
        return updatedDoc
    } catch (err) {
        throw err
    }
}


const getCandidate = async (req) => {
    try {
        const { id } = req.query
        const registration = await registrationModel.findOne({ _id: id })
        return registration
    } catch (err) {
        throw err
    }
}



module.exports = { registerNewCanidate, getCandidate, markRegistrationAsRead, getAllCandidates }