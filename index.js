import express from "express"

const app = express()

app.get("/", (request, response) => response.send("Hello world"))

app.listen(8000, () => console.log("Funfou"))