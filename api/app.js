import "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import trackRoute from "./routes/track.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ 
    origin: process.env.CLIENT_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/track", trackRoute);

app.use(express.static(path.join(__dirname,  "dist")));
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
})


app.listen(8800, () => {
  console.log("Server is Running");
});
