const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { Users, Posts } = require("./models");
const db = require("./models/index.js");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = 4000;
const SECRET_KEY = "100xMicrobloggingSocialMediaApp";

// const sendVerificationCode = async (email, verificationCode) => {
//   try {
//     const mailOptions = {
//       from: process.env.USER,
//       to: email,
//       subject: "100x Verification Code",
//       text: `Your verification code is: ${verificationCode}`,
//     };

//     const result = await transporter.sendMail(mailOptions);
//     console.log("Verification code sent:", result);
//   } catch (error) {
//     console.error("Error sending verification code:", error);
//   }
// };

app.get("/healthcheck", async (req, res) => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.close();
    res.status(200).send("I'm healthy!");
  } catch (error) {
    await db.sequelize.close();
    res.status(500).send("Unable to connect to the sever");
  }
});

const authenticateUser = async (req, res, next) => {
  const user_id = req.cookies.user_id;
  if (!user_id) {
    return res.status(401).send("Unauthorized User.");
  }
  try {
    req.current_user = await Users.findOne({ where: { id: user_id } });
    next();
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
};

app.post("/signup", async (req, res) => {
  try {
    const saltCount = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltCount);
    const user = await Users.create({
      displayName: req.body.displayName,
      username: req.body.username,
      email: req.body.email,
      location: req.body.location,
      bio: req.body.bio,
      password: hashedPassword,
      website: req.body.website,
      dateOfBirth: new Date(req.body.dateOfBirth),
      profilePicUrl: req.body.profilePicUrl,
      headerPicUrl: req.body.headerPicUrl,
    });

    const jwtToken = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY);
    res.status(201).send({ message: "User created!", token: jwtToken });
  } catch (error) {
    res.status(500).send({ error: "Failed to Create  user" });
    console.log(error);
    console.log(req.body);
  }
});

app.post("/verifyOtp", async (req, res) => {
  const { email } = req.body;
  let transporter = nodemailer.createTransport({
    host: process.env.HOST,
    service: process.env.SERVICE,
    port: Number(process.env.EMAIL_PORT),
    secure: Boolean(process.env.SECURE),
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const message = {
    from: "100x Social Media App <team@100xapp.com>",
    to: `${email}`,
    subject: "100x app verification code",
    text: "Hey Buddy",
  };

  let info = await transporter.sendMail(message);
  console.log("Message Sent: ", info.messageId);
  console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));

  res.send("EMail sent!!");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send("Invalid credentials");
    }
    const jwtToken = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY);
    res.cookie("user_id", jwtToken, {
      httpOnly: true,
      // secure:true,
      maxAge: 3600000,
    });

    res.status(200).send({ message: "LoggedIn", token: jwtToken });
  } catch (err) {
    console.error("Error during login", err);
    console.log(email, password);
    res.status(500).send("Internal server error");
  }
});

app.get("/feed", authenticateUser, async (req, res) => {
  try {
    const posts = await Posts.findAll();
    res.status(200).json({ posts: posts, email: req.current_user.email });
  } catch (error) {
    res.status(500).json({ error: "failed to fetch posts" });
  }
});

app.listen(port, () => {
  console.log("app running on port 4000");
});
