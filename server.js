const express = require("express")
const server = express()

server.use('/', express.static(__dirname + "/"))

server.listen(3000, () => console.log("server on"))