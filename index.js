import express from "express"
import random from "randomstring"
import sqlite from 'sqlite3'

import UserController from "./controllers/user_controller.js"
import UrlController from "./controllers/url_controller.js"

const app = express()
const database = new sqlite.Database('./db/data/encurta.db')

const controllers = {
    user: new UserController(database),
    url: new UrlController(database),
}

app.use(express.json())

app.get("/users", controllers.user.all)
app.post("/users", controllers.user.create)

app.get("/:url", controllers.url.show)
app.post("/urls", controllers.url.create)

app.get("/404", (request, response) => {
    response.status(404).send('Você errou').end()
})

app.listen(8000, () => console.log("Funfou"))