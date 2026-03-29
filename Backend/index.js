import express  from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import dotenv from "dotenv";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"
import savedjobRoute from "./routes/savedJobs.route.js"

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
const corsOptions={
    origin:process.env.BASE_URL,
    credentials:true
}

app.use(cors(corsOptions));

app.use("/api/v1/users",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/applications",applicationRoute);
app.use("/api/v1/jobSaving",savedjobRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port number ${PORT}`);
})

