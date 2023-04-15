const express = require('express')
const router = express.Router()
const { registerNewCanidate, getCandidate, markRegistrationAsRead ,getAllCandidates } = require('../Controllers/admin.controller')
const Response = require('../Classes/Response')


router.post('/login', (req, res) => {
    const { name, pwd } = req.body
    if (name == "admin" && pwd == "123") {
        res.send({ loggedIn: true })
    } else {
        res.send({ loggedIn: false })
    }
})

router.post('/register', async (req, res) => {
    let doc = await registerNewCanidate(req.body)
        .then((response) => new Response(200, response, false))
        .catch((err) => new Response(400, null, true))
    res.send(doc)
})

router.get('/registration', async (req, res) => {
    let response = await getCandidate(req)
    .then((response) => new Response(200, response, false))
    .catch((err) => new Response(400, null, true))
    res.status(response.status).send(response)
})

router.patch('/registration/markasread', async (req, res) => {
    let response = await markRegistrationAsRead(req)
    .then((response) => new Response(200, response, false))
    .catch((err) => new Response(400, null, true))
    res.status(response.status).send(response)
})

router.get('/registrations/all', async (req, res) => {
    let response = await getAllCandidates(req)
    .then((response) => new Response(200, response, false))
    .catch((err) => new Response(400, null, true))
    res.status(response.status).send(response)
})

module.exports = router