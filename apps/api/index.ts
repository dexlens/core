import express from "npm:express";
import rateLimit from "npm:express-rate-limit";

const app = express();

// Create rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per 15 minutes
    message: "Too many requests from this IP, please try again later"
});

// Apply rate limiter to all routes
app.use(limiter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});
