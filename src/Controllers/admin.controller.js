const { registrationModel } = require('../Models/registration')
const qrcode = require('qrcode')


const registerNewCanidate = async (body) => {
    try {
        const doc = await new registrationModel({ name: body.name, items: body.items, college: body.college, department: body.department, email: body.email, phone: body.phone, event: body.event ,registerId:body.registerId}).save()
        const qrCodeURL = await qrcode.toDataURL(doc._id)
        const updatedDoc = await registrationModel.findOneAndUpdate({ _id: doc._id }, { qrUrl: qrCodeURL }, { new: true })
        return updatedDoc
    } catch (err) {
        throw err
    }
}

const getAllCandidates = async (req) => {
    try {
        const registration = await registrationModel.find({valid:true}).sort(req.query)
        return registration
    } catch (err) {
        throw err
    }
}

const markRegistrationAsRead = async (req) => {
    try {
        const { id } = req.query
        const updatedDoc = await registrationModel.findOneAndUpdate({ _id: id }, { $set: { valid: false } }, { new: true })
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

const searchCandidate = async (req) => {
    try {
        const registration = await registrationModel.find({ name: { $regex: req.query.name, "$options": "i" } })
        return registration
    } catch (err) {
        throw err
    }
}

const filterCandidate = async (req) => {
    try {
        const registration = await registrationModel.find(req.query)
        return registration
    } catch (err) {
        throw err
    }
}

const deleteCandidate = async (req)=>{
    try {
        const registration = await registrationModel.findOneAndDelete({_id:req.query.id})
        return registration
    } catch (err) {
        throw err
    }
}

module.exports = { registerNewCanidate, getCandidate, markRegistrationAsRead, getAllCandidates, searchCandidate, filterCandidate ,deleteCandidate }