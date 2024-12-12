import { Users } from "../db/entities/users.entity.js";
import ds from "../config/data-source.js";
import bcrypt from "bcrypt";

export class UserService {
    private userRepository = ds.getRepository(Users);

    async register(username: string, password: string, role: string = "user") {
        const existingUser = await this.userRepository.findOne({ where: { username } });
        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Users();
        user.username = username;
        user.password = hashedPassword;
        user.role = role;

        return await this.userRepository.save(user);
    }

    async login(username: string, password: string) {
        const user = await this.userRepository.findOne({ 
            where: { username },
            select: ["userid", "username", "password", "role"]
        });
        if (!user) {
            throw new Error("Authentication failed");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Authentication failed");
        }

        return user;
    }

    async getById(id: number) {
        return await this.userRepository.findOne({ 
            where: { userid: id },
            select: ["userid", "username", "role"]
        });
    }
}
