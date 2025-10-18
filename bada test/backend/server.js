import express from "express";
import cors from "cors";
import { AIService } from "./services/aiService.js";
import { createChatRoutes } from "./routes/chatRoutes.js";
import { Logger } from "./utils/logger.js";

// ===== HARDCODED ENVIRONMENT VARIABLES =====
const HARDCODED_CONFIG = {
  PORT: 3004,
  AI_PROVIDER: "humble", // or "openai"
  HUMBLE_API_KEY: "0199dcfb-ca11-7062-a684-f6df5274d0eb",
  HUMBLE_BASE_ID: "0199dcfb-ca11-7062-a684-f6df5274d0eb",
  OPENAI_API_KEY:
    "sk-proj-JBwcAD65E3zL7Yd8Ky9Lm0Np1Qr2St3Uv4Wx5Yz6Aa7Bb8Cc9Dd0Ee1Ff2Gg3Hh4Ii5Jj6Kk7Ll8Mm9Nn0Oo1Pp2Qq3Rr4Ss5Tt6Uu7Vv8Ww9Xx0Yy1Zz2Aa3Bb4Cc5Dd6Ee7Ff8Gg9Hh0Ii1Jj2Kk3Ll4Mm5Nn6Oo7Pp8Qq9Rr0Ss1Tt2Uu3Vv4Ww5Xx6Yy7Zz8Aa9Bb0Cc1Dd2Ee3Ff4Gg5Hh6Ii7Jj8Kk9Ll0Mm1Nn2Oo3Pp4Qq5Rr6Ss7Tt8Uu9Vv0Ww1Xx2Yy3Zz4Aa5Bb6Cc7Dd8Ee9Ff0Gg1Hh2Ii3Jj4Kk5Ll6Mm7Nn8Oo9Pp0Qq1Rr2Ss3Tt4Uu5Vv6Ww7Xx8Yy9Zz0Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk1Ll2Mm3Nn4Oo5Pp6Qq7Rr8Ss9Tt0Uu1Vv2Ww3Xx4Yy5Zz6Aa7Bb8Cc9Dd0Ee1Ff2Gg3Hh4Ii5Jj6Kk7Ll8Mm9Nn0Oo1Pp2Qq3Rr4Ss5Tt6Uu7Vv8Ww9Xx0Yy1Zz2Aa3Bb4Cc5Dd6Ee7Ff8Gg9Hh0Ii1Jj2Kk3Ll4Mm5Nn6Oo7Pp8Qq9Rr0Ss1Tt2Uu3Vv4Ww5Xx6Yy7Zz8Aa9Bb0Cc1Dd2Ee3Ff4Gg5Hh6Ii7Jj8Kk9Ll0Mm1Nn2Oo3Pp4Qq5Rr6Ss7Tt8Uu9Vv0Ww1Xx2Yy3Zz4Aa5Bb6Cc7Dd8Ee9Ff0Gg1Hh2Ii3Jj4Kk5Ll6Mm7Nn8Oo9Pp0Qq1Rr2Ss3Tt4Uu5Vv6Ww7Xx8Yy9Zz0Aa1Bb2Cc3Dd4Ee5Ff6Gg7Hh8Ii9Jj0Kk1Ll2Mm3Nn4Oo5Pp6Qq7Rr8Ss9Tt0Uu1Vv2Ww3Xx4Yy5Zz6Aa7Bb8Cc9Dd0Ee1Ff2Gg3Hh4Ii5Jj6Kk7Ll8Mm9Nn0Oo1Pp2Qq3Rr4Ss5Tt6Uu7Vv8Ww9Xx0Yy1Zz2Aa3Bb4Cc5Dd6Ee7Ff8Gg9Hh0Ii1Jj2Kk3Ll4Mm5Nn6Oo7Pp8Qq9Rr0Ss1Tt2Uu3Vv4Ww5Xx6Yy7Zz4NV2kf7PNoA",
};
// ==========================================

const app = express();
// Use PORT from environment (Render sets this), fallback to hardcoded
const PORT = process.env.PORT || HARDCODED_CONFIG.PORT;
const AI_PROVIDER = HARDCODED_CONFIG.AI_PROVIDER;

// Middleware
// Configure CORS to allow requests from Netlify frontend
app.use(
  cors({
    origin: [
      "https://b5chatbot.netlify.app",
      "http://localhost:3005",
      "http://localhost:3000",
      "*", // Allow all origins for development
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Initialize AI Service
const aiService = new AIService(AI_PROVIDER, {
  HUMBLE_API_KEY: HARDCODED_CONFIG.HUMBLE_API_KEY,
  HUMBLE_BASE_ID: HARDCODED_CONFIG.HUMBLE_BASE_ID,
  OPENAI_API_KEY: HARDCODED_CONFIG.OPENAI_API_KEY,
});

// Debug: Log API key status
console.log("API Key Configuration:");
console.log("  HUMBLE_API_KEY present:", !!process.env.HUMBLE_API_KEY);
console.log("  HUMBLE_BASE_ID present:", !!process.env.HUMBLE_BASE_ID);
console.log("  OPENAI_API_KEY present:", !!process.env.OPENAI_API_KEY);
if (process.env.OPENAI_API_KEY) {
  console.log("  OPENAI_API_KEY length:", process.env.OPENAI_API_KEY.length);
  console.log(
    "  OPENAI_API_KEY starts with:",
    process.env.OPENAI_API_KEY.substring(0, 20)
  );
  console.log(
    "  OPENAI_API_KEY ends with:",
    process.env.OPENAI_API_KEY.substring(process.env.OPENAI_API_KEY.length - 10)
  );
}

Logger.success(`Using ${AI_PROVIDER} provider`);

// ===== API ROUTES ONLY =====
// Health check
app.get("/api/health", (_, res) => {
  res.json({ status: "ok", message: "Humble AI Chatbot is running" });
});

// Chat routes
app.use("/api/chat", createChatRoutes(aiService));

// Root path - return API info (not frontend)
app.get("/", (_, res) => {
  res.json({
    status: "ok",
    message: "Humble AI Chatbot Backend API",
    endpoints: {
      health: "/api/health",
      createChat: "POST /api/chat/create",
      sendMessage: "POST /api/chat/:chatId/message",
      getChat: "GET /api/chat/:chatId",
      deleteChat: "DELETE /api/chat/:chatId",
    },
    frontend: "https://b5chatbot.netlify.app/",
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
    availableEndpoints: {
      health: "/api/health",
      createChat: "POST /api/chat/create",
      sendMessage: "POST /api/chat/:chatId/message",
      getChat: "GET /api/chat/:chatId",
      deleteChat: "DELETE /api/chat/:chatId",
    },
  });
});

// Error handling middleware
app.use((err, _, res) => {
  Logger.error("Request error", err.message);
  console.error("Full error details:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

app.listen(PORT, () => {
  Logger.success(`Humble AI Chatbot server running on port ${PORT}`);
});
