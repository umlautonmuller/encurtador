export default class UrlController {
    constructor(database) {
        this.database = database
    }

    create (request, response) {
        const source = request.body.url

        const destination = random.generate({
            length: 9,
            charset: 'alphabetic'
        })

        this.database.serialize(() => {
            this.database.run(`INSERT INTO urls (shortened, original, user_id, created_at, updated_at) VALUES (${destination}, ${source}, 0, 'Hoje', 'Hoje')`)
        })

        response.json({
            url: `http://${request.headers.host}/${destination}`
        })
    }
    
    all (request, response) {
        const urls = []

        this.database.serialize(() => {
            this.database.each("SELECT * from urls", (err, row) => {
                urls.push(row)
            })
        })

        return urls
    }

    show (request, response) {
        let url

        this.database.serialize(() => {
            url = this.database.first(`SELECT * FROM urls WHERE shortened = '${request.params.url}'`)
        })

        if (url === undefined) {
            response.redirect('/404')
        } else {
            response.redirect(url.original)
        }
    }

    update (data) {}
    delete (id) {}
}