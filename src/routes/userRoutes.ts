import { Request, Response, Router } from "express";
import { UserService } from "../services/userService.js";

const router: Router = Router();
const userService = new UserService();

router.post("/register", async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    
    try {
        const user = await userService.register(username, password, role);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await userService.login(username, password);
        req.session.userId = user.userid;
        res.status(200).json({ message: "Login successful", user });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
});

router.get("/me", async (req: Request, res: Response) => {
    if (!req.session.userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const user = await userService.getById(req.session.userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
