import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import prisma from "./lib/prisma.js";

import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import trackRoute from "./routes/track.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ 
    origin: ["https://express-safesphere.com", "http://express-safesphere.com", process.env.CLIENT_URL], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/track", trackRoute);

app.use(express.static(path.join(__dirname,  "dist")));
app.use((req,res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
})

setInterval(async () => {
  try {
    // This simple query keeps the connection tunnel "warm"
    await prisma.$queryRaw`SELECT 1`;
    console.log("SafeSphere Heartbeat: Connection stays hot 🔥");
  } catch (err) {
    console.log("Heartbeat: Database was asleep, waking it up...");
  }
}, 600000);

console.log("DB URL Check:", process.env.DATABASE_URL ? "Exists" : "MISSING");

app.listen(8800, () => {
  console.log("Server is Running");
});
