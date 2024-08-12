import express from "express"
import {
    getUser,
    getUserFriends,
    addRemoveFriends
} from "../controller/user.controller.js"

const router = express.Router();

router.get("/:id", getUser);

export default router;