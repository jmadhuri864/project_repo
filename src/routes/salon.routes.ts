import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import { CreateSalonSchema} from "../schemas/salon.schema";
import { createSalonHandler } from "../controllers/salon.controller";

const router = express.Router();

router.use(deserializeUser, requireUser);

router.post('/createsalonData',validate(CreateSalonSchema),createSalonHandler)
//router.get('/email',findUserWithEmailHandler )
export default router;
