import express, { Request, Response } from "express";
import Task from "../models/task.js";

const router = express.Router();

router.get("/", (_: Request, res: Response): void => {
  Task.find()
    .then((tasks) => res.status(200).json(tasks))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.put("/:id", (req: Request, res: Response): void => {
  const id = req.params["id"];
  if (!id) {
    res.status(400).send({ error: "Invalid task ID" });
    return;
  }

  Task.findByIdAndUpdate(id, req.body, { new: true })
    .then((task) => res.status(200).json(task))
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.delete("/:id", (req: Request, res: Response): void => {
  const id = req.params["id"];
  if (!id) {
    res.status(400).send({ error: "Invalid task ID" });
    return;
  }

  Task.findByIdAndDelete(id)
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).json({ error: err.message }));
});

export default router;
