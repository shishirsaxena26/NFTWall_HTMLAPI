import express from "express";
import path from "path";
import { signup, login } from "./sockets/auth.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  
const __dirname = path.resolve();
app.use(express.static(__dirname));

// Signup endpoint
app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;
  const result = signup(username, password);
  res.json(result);
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const result = login(username, password);
  res.json(result);
});

export default app;
