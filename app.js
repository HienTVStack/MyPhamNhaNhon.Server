const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const debug = require("debug")("myphamnhanhon-server:server");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.status(200).json({ status: 404, message: "NOT FOUND" });
});
app.use("/api", require("./src/routes"));

const port = process.env.PORT || "3000";
app.set("port", port);

mongoose
    .connect(process.env.MONGODB_CONNECT_URL)
    .then(() => {
        server.listen(port);
        console.log(`Server run port: ${port}`);
        // server.on("error", onError);
        // server.on("listening", onListening);
        console.log(
            `Server connect success ${process.env.MONGODB_CONNECT_URL}`
        );
    })
    .catch((err) => {
        console.log({ message: `Connect fail`, error: err });
        process.exit(1);
    });

module.exports = app;
