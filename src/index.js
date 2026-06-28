import dotenv from "dotenv"
import connectDB from "./db/index.js";

connectDB()
dotenv.config({ path: '/.env' })

// (async() => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     } catch (error) {
//         console.log(error);
//         throw err
//     }
// })()