import express from "express";
import { paymentMiddleware } from "x402-express";

const app = express();
app.use(express.json());

// 从环境变量获取收款地址
const PAY_TO = process.env.PAY_TO || "0x0000000000000000000000000000000000000000";

// x402 payment middleware
const payment = paymentMiddleware(PAY_TO, {
  "GET /api/weather": {
    price: "$0.01",
    network: "base",
    config: {
      description: "Weather API - Get current weather for a city",
    },
  },
});

// Protected endpoint
app.get("/api/weather", payment, (req, res) => {
  const city = req.query.city || "Beijing";
  res.json({ city, temperature: 22, condition: "Sunny" });
});

// 导出 app 供 Vercel Serverless Function 使用
export default app;