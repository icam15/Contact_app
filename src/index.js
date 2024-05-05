import express from "express";
import dotnev from "dotenv";
dotnev.config();

const app = express();
const port = process.env.PORT

app.listen(port, () => {
    console.log(`server run at port ${port}`)
});

