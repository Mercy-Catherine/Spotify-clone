import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    try {
        const { userId } = await req.auth(); // ✅ updated
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - you must be logged in" });
        }
        req.userId = userId; // optional: attach to req for downstream use
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const requireAdmin = async (req, res, next) => {
    try {
        const { userId } = await req.auth(); // ✅ updated
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized - you must be logged in" });
        }

        const currentUser = await clerkClient.users.getUser(userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({ message: "Forbidden - you must be an admin" });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
