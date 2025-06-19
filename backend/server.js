import express from "express";
import { connectDB } from "./config/db.js";
import notesRoute from "./routes/notesRoute.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

const app = express();

// middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(rateLimiter);
app.use("/api/notes", notesRoute);

// Connect DB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
