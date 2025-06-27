import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express"
import { functions, inngest } from "./injest/indes.js";

const app = express();
const port = 3000;

await connectDB()


// Middleware 
app.use(express.json()) //all the request will be passed in json method
app.use(cors())
app.use(clerkMiddleware())

// API routes
app.get("/", (req, res) => res.send("Server is Live"))
app.use('/api/inngest', serve({ client: inngest, functions }))
app.listen(port, () => console.log(`server listening at http://localhost:${port}`));

