import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import signupRoutes from "./routes/signupRoutes.js";
import bodyParser from "body-parser";

const PORT_NUMBER = 8080;
dotenv.config();
const app = express();
app.use(cors());
app.use(
  bodyParser.json({ limit: "100mb", extended: true, parameterLimit: 50000 })
);
app.use(
  express.json({ limit: "100mb", extended: true, parameterLimit: 50000 })
);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/signup", signupRoutes);
app.use("/api/v1/login", loginRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from dalle");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT_NUMBER, () =>
      console.log(`Server Started at PORT ${PORT_NUMBER}`)
    );
  } catch (error) {
    console.log(error);
  }
};
startServer();
