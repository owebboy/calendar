const express = require("express")
const server = express()

server.use('/', express.static(__dirname + "/"))

server.listen(8080)