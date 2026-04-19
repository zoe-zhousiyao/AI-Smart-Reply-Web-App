import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "你是一个礼貌、温和的家庭助手" },
                { role: "user", content: userMessage }
            ]
        })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
});

app.listen(3000, () => console.log("Server running on port 3000"));