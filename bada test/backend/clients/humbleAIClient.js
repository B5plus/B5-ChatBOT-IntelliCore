import axios from "axios";

export class HumbleAIClient {
  constructor(humbleApiKey, baseId, openaiApiKey) {
    this.humbleApiKey = humbleApiKey;
    this.baseId = baseId;
    this.openaiApiKey = openaiApiKey;
    this.baseURL = "https://platform.thehumbleai.com/api/assistant";

    // Validate credentials
    if (!humbleApiKey) {
      console.error("ERROR: HUMBLE_API_KEY is not set!");
    }
    if (!baseId) {
      console.error("ERROR: HUMBLE_BASE_ID is not set!");
    }
    if (!openaiApiKey) {
      console.error(
        "ERROR: OPENAI_API_KEY is not set! Humble AI requires OpenAI key."
      );
    }

    console.log("HumbleAIClient initialized with:");
    console.log("  Base URL:", this.baseURL);
    console.log("  Base ID:", this.baseId);
    console.log("  Humble API Key present:", !!humbleApiKey);
    console.log("  OpenAI API Key present:", !!openaiApiKey);

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        Authorization: `Token ${humbleApiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Create a new chat
   * POST /api/assistant/chats/{baseId}
   */
  async createChat() {
    try {
      console.log("Creating chat with baseId:", this.baseId);
      console.log(
        "Using Humble API Key:",
        this.humbleApiKey?.substring(0, 20) + "..."
      );

      // Humble AI expects an object with 'sub' field in the request body
      const payload = { sub: this.baseId };
      console.log("Attempting POST to /chats/" + this.baseId);
      console.log("Payload object:", payload);
      console.log("Payload JSON:", JSON.stringify(payload));
      console.log("Axios client headers:", this.client.defaults.headers);

      const response = await this.client.post(`/chats/${this.baseId}`, payload);
      console.log("✅ Chat created successfully!");
      console.log("  Response status:", response.status);
      console.log("  Response data:", response.data);
      console.log("  Response headers:", response.headers);
      return response.data;
    } catch (error) {
      console.error("❌ CREATE CHAT ERROR");
      console.error("  Error message:", error.message);
      console.error("  Error code:", error.code);
      console.error("  Response status:", error.response?.status);
      console.error("  Response data:", error.response?.data);
      console.error("  Response headers:", error.response?.headers);
      console.error("  Full error:", error);

      // Extract error message
      let errorMsg = error.message;
      if (error.response?.data) {
        if (Array.isArray(error.response.data)) {
          errorMsg =
            error.response.data[0]?.message ||
            JSON.stringify(error.response.data);
        } else if (typeof error.response.data === "object") {
          errorMsg =
            error.response.data.message || JSON.stringify(error.response.data);
        } else {
          errorMsg = String(error.response.data);
        }
      }

      console.error("❌ Final error message:", errorMsg);
      throw new Error(`Failed to create chat: ${errorMsg}`);
    }
  }

  /**
   * Get chat with messages
   * GET /api/assistant/chats/{chatId}
   */
  async getChat(chatId) {
    try {
      const response = await this.client.get(`/chats/${chatId}`);
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
      console.error("Get chat error:", errorMsg);
      throw new Error(`Failed to get chat: ${errorMsg}`);
    }
  }

  /**
   * Post message to chat
   * POST /api/assistant/messages/{chatId}
   * Payload: { "content": "...", "jsonSchema": {...} }
   */
  async postMessage(chatId, content, jsonSchema = null) {
    try {
      console.log("Posting message to chat:", chatId);
      console.log(
        "Using OpenAI API Key:",
        this.openaiApiKey?.substring(0, 20) + "..."
      );
      const payload = { content };
      if (jsonSchema) {
        payload.jsonSchema = jsonSchema;
      }
      const response = await this.client.post(`/messages/${chatId}`, payload);
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
      console.error(
        "Post message error:",
        errorMsg,
        "Status:",
        error.response?.status,
        "Full error:",
        error.response?.data
      );
      throw new Error(`Failed to post message: ${errorMsg}`);
    }
  }

  /**
   * Process query without chat
   * POST /api/assistant/bases/{baseId}/queries
   * Payload: { "content": "...", "jsonSchema": {...} }
   */
  async processQuery(content, jsonSchema = null) {
    try {
      const payload = { content };
      if (jsonSchema) {
        payload.jsonSchema = jsonSchema;
      }
      const response = await this.client.post(
        `/bases/${this.baseId}/queries`,
        payload
      );
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
      console.error("Process query error:", errorMsg);
      throw new Error(`Failed to process query: ${errorMsg}`);
    }
  }

  /**
   * Delete chat
   * DELETE /api/assistant/chats/{chatId}
   */
  async deleteChat(chatId) {
    try {
      const response = await this.client.delete(`/chats/${chatId}`);
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message;
      console.error("Delete chat error:", errorMsg);
      throw new Error(`Failed to delete chat: ${errorMsg}`);
    }
  }
}
