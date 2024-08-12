import { Router } from "express";
import {register, login} from "../controller/auth.controller.js"
import { getUser } from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.post('/register', upload.single("picture"),register)
router.post('/login', login)
router.get("/get-user", getUser)
export default router;