import sqlite from 'sqlite3'

const database = new sqlite.Database('./db/data/encurta.db')

database.serialize(() => {
    console.log("Creating users table")

    database.run(`
        CREATE TABLE users (
            id AUTO_INCREMENT PRIMARY KEY,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
    `)

    console.log("Creating urls table")

    database.run(`
        CREATE TABLE urls (
            shortened TEXT NOT NULL,
            original TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            accesses INTEGER DEFAULT 0,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
    `)
})

database.close()