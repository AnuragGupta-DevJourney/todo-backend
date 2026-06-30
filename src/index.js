import express from "express"
import dotenv from "dotenv"
import dns from "dns"
import cors from "cors";
import todoRouter from "./routes/todoRoute.js";
import db_connection from "./config/dbConnection.js";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config()

const app = express();

// configure
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", function (req, res) {
    res.send("<h1>Hello world</h1>")
});

app.use("/", todoRouter)

const PORT = process.env.PORT || 3000;

db_connection()
.then((db) => {
    console.log(process.env.DEV_TYPE == "local" ? db.connection._connectionString : "db connected");
    app.listen(PORT, function () {
        console.log(process.env.DEV_TYPE == 'local' ? `Server running on http://localhost:${PORT}` : "server running")
    });
})
.catch((err) => console.log("error", err))

