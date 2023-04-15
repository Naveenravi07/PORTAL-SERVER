const mongoose = require('mongoose')
const schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid')

const registrationSchema = new schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    college: { type: String, required: true },
    department: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    event: { type: String, default: "Coding Challenge" },
    items: { type: Array, default: [] },
    valid: { type: Boolean, default: true },
    qrUrl: { type: String, required: false },
    createdAt:{type:Date,default:Date.now}
})

const registrationModel = mongoose.model('registrations', registrationSchema)
module.exports = { registrationModel }