import path from "path";
import express from "express"
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import userRoutes from "./routes/userRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import productRoutes from "./routes/productRoutes";
import testRoutes from "./routes/testRoutes";
import cors from 'cors';
import mongoose from 'mongoose';
import assert from 'assert';
dotenv.config();
connectDB();
const app = express();
var corsOptions = {
    origin: "*",
  };
app.use(cors(corsOptions));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}


app.use(function(req, res, next) {

  res.letscmsresponse = function ({result={}, code=200, message="",errors={}}) {
      return res.json({
          result,
          code,
          message,
          errors
      })
  }
  next();
});

app.use(express.json({limit: '500mb'}));

app.use(express.urlencoded({limit: '500mb'}));

app.use("/api/users/", userRoutes);
app.use("/api/product/", productRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/test/", testRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    console.log('aaaaaa');
    res.send("API is running....");
  });
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
