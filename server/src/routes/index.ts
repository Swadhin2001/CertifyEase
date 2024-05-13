import express from "express"
import { signup } from "../controllers/createtodb.controller";

const router = express.Router();

// Middleware
router.use (express.urlencoded({ extended: true }));
router.use (express.json());


router.route('/userCertificate').post(signup);

export {router}