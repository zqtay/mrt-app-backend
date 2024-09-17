import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { getNotifications } from "@/lib/smrt";

const router = express.Router();
router.use(bodyParser.json());

// GET
router.get("/notifications", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getNotifications();
    res.status(200).json(data);

  } catch (error) {
    next(error);
  }
});

export default router;