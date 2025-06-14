import express from "express";
import { connectDB } from "./config/db.js";
import notesRoute from "./routes/notesRoute.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
const app = express()



//middleware
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // optional: if you're using cookies or auth headers
  })
);
app.use(rateLimiter)
app.use("/api/notes",notesRoute)


connectDB().then( () => {
    app.listen(5001, () => {
    console.log("server started on PORT: 5001");
});
}

);

//