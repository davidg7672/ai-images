import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const openai = new OpenAI();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post("/dream", async (req, res) => {
    const prompt = req.body.prompt;
    const aiResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: "1024x1024",
    });

    const image = aiResponse.data[0].url;
    res.send({ image });
});

app.listen(PORT, () => {
    console.log(`Create art on local host http://localhost:${PORT}/dream`);
});
