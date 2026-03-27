import express from "express";
import apiRouter from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api",apiRouter);

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`listening on ${PORT}✅`);
});
