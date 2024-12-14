const express = require("express");
const memberRouter = require("./routes/member.cjs");
const letterRouter = require("./routes/letter.cjs");
const voteRouter = require("./routes/vote.cjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const port = 8000;
const timeout = require("connect-timeout");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

// require("dotenv").config();

const { db_info } = require("./config/config.cjs");

const MySQLStore = require("express-mysql-session")(session);
const sessionStore = new MySQLStore(db_info);

// CORS options
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://ec2-43-201-5-0.ap-northeast-2.compute.amazonaws.com/",
    "http://ec2-43-201-5-0.ap-northeast-2.compute.amazonaws.com:3000",
  ],
  credentials: true,
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: sessionStore,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.text());

app.use(timeout("3s"));

app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use((err, req, res, next) => {
  if (req.timedout) {
    res
      .status(503)
      .send({ status: 503, message: "request_time_out", data: null });
  } else {
    next(err);
  }
});

app.use(limiter);
app.use(helmet());

// /api 경로용 라우터
const apiRouter = express.Router();
apiRouter.use("/members", memberRouter);
apiRouter.use("/letters", letterRouter);
apiRouter.use("/votes", voteRouter);

// 공통 라우터
app.use("/api", apiRouter);

// Error handling middleware
app.use(function onError(err, req, res, next) {
  console.error(err.stack);
  res.statusCode = 500;
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
