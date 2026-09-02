import express from "express";

import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, async () => {
  await startDB();
  console.log(`servidor corriendo en el puerto ${PORT}`);
});
