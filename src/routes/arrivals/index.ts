import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { getArrivalTimes } from "../../lib/smrt";

const router = express.Router();
router.use(bodyParser.json());

// GET
router.get("/stations/:name/arrivals", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.name;
    const data = await getArrivalTimes(name);
    res.status(200).json(data);

  } catch (error) {
    next(error);
  }
});

export default router;