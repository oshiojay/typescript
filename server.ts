import express from "express";
import prisma from "./config/prisma";
const PORT = process.env.PORT

import userRouter from "./routes/userRoute"

const app = express()
app.use(express.json());

app.use('/api/v1/users', userRouter)


const databaseConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("unable to connect to database:", error);
    process.exit(1);
  }
};

databaseConnection();