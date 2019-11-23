const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000 || process.env.PORT;
//Import routers
const host = require("./routers/host");
const visitor = require("./routers/visitor");

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/host", host);
app.use("/visit", visitor);

mongoose.connect("mongodb://localhost:27017/test-app", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
});
mongoose.connection.on("connected", () => {
  console.log("Database connected");
});

// app.get("/", (req, res) => {
//   res.send("Hello Word");
// });

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
