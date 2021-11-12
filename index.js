import express from "express"
import random from "randomstring"

const app = express()

app.use(express.json())

const urls = {}

app.post("/generate", (request, response) => {
    const source = request.body.url

    const destination = random.generate({
        length: 9,
        charset: 'alphabetic'
    })

    urls[destination] = source

    response.json({
        url: `http://${request.headers.host}/${destination}`
    })
})

app.get("/404", (request, response) => {
    response.status(404).send('Você errou').end()
})

app.get("/:url", (request, response) => {
    const url = urls[request.params.url]

    if (url === undefined) {
        response.redirect('/404')
    } else {
        response.redirect(url)
    }
})

app.listen(8000, () => console.log("Funfou"))