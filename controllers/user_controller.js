export default class UserController {
    constructor(database) {
        this.database = database
        console.log(this)
    }

    create (request, response) {
        const user = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
        }

        this.database.serialize(() => {
            this.database.run(`INSERT INTO users (name, email, password, created_at, updated_at) VALUES (${user.name}, ${user.email}, ${user.password}, 'Hoje', 'Hoje')`)
        })

        response.json({
            'data': user
        })
    }
    
    all (request, response) {
        const users = []

        this.database.serialize(() => {
            this.database.each("SELECT * from users", (err, row) => {
                users.push(row)
            })
        })

        return users
    }

    show (id) {}
    update (data) {}
    delete (id) {}
}