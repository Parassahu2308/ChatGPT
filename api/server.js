import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
// import API_KEY from "./secret.js";
// const { API_KEY } = require("./secret");
import dontenv from "dotenv";

dontenv.config();

// console.log(process.env.API_KEY);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).send({
    msg: "This is AI App",
  });
});

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.input, // input question
      temperature: 0, //Accurate ans
      max_tokens: 4000, // length of ans by bot
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log("Paased", req.body.input);

    res.status(200).send({
      bot: response.data.choices[0].text,
      //   bot: response.data
    });
  } catch (err) {
    console.log("Failed", req.body.input);
    console.log(err);
    res.status(500).send(err);
  }
});

app.listen("5000", () => console.log("Server is running on port: 5000!"));
