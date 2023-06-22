const express = require("express");
const { connection } = require("../Backend/main");
const { userRoute } = require("../Backend/routes/UserRoute");
const { blogRoute } = require("./routes/BlogRoute");
const { Auth } = require("./middlewares/middleware");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoute);

app.use(Auth);

app.use("/blogs", blogRoute);

app.get("/", (req, res) => {
  res.send("This is Homepage");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected");
    console.log("Server is listening");
  } catch (error) {
    console.log(error);
  }
});
