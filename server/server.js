import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"

dotenv.config()
    
const app = express()
app.use(express.json())
app.use(cors())


    
const db = new pg.Pool({
    connectionString: process.env.DB_CONN
})

app.get('/', (req, res) => {
    res.send('Hell')
})

app.get('/messages', async (req, res) => {
    const data = await db.query(`SELECT * FROM messages`)
    const messages = data.rows
    res.status(200).json(messages)
})

app.post('/messages', async (req, res) => {
    const userData = req.body

    const dbQuery = await db.query(`INSERT INTO messages (msg_name, content) VALUES ($1, $2)`, [userData.msg_name, userData.content])

    res.status(200).json({message: "added message"})
})

const PORT = process.env.PORT || 4242

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

