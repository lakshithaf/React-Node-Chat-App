"use strict"; //For use with ES6

const express = require("express");
const router = express.Router();


//add route files in app
const rootRouter = require("./root-routes");
const authRouter = require("./auth-routes");
const userRouter = require("./user-routes");
const chatRouter = require("./chat-routes");


router.use("/", rootRouter);
router.use("/v1/", rootRouter);
router.use("/v1/auth", authRouter);
router.use("/v1/users", userRouter);
router.use("/v1/chats", chatRouter);


module.exports = router;
