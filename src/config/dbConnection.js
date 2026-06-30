import mongoose from "mongoose";

async function db_connection() {
    const DB_URL = process.env.MONGO_DB_URL
    // console.log("db",DB_URL)
    const db = await mongoose.connect(DB_URL)
    return db
}

export default db_connection
