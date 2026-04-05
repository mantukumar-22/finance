import express from "express"
import userRoutes from "./routes/userRoute.js"
import recordRoutes from "./routes/recordRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) =>{
    res.status(201).json({message : "Finance Tracker API"});
})

app.use("/api/user", userRoutes);
app.use("/api/record", recordRoutes);


export default app;