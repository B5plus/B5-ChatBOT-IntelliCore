/**
 * Local AI Client - Mock implementation for testing
 * This simulates the Humble AI API locally without external dependencies
 */

export class LocalAIClient {
  constructor(baseId, openaiApiKey) {
    this.baseId = baseId;
    this.openaiApiKey = openaiApiKey;
    this.chats = new Map(); // Store chats in memory
    this.messages = new Map(); // Store messages in memory

    console.log("LocalAIClient initialized with:");
    console.log("  Base ID:", this.baseId);
    console.log("  OpenAI API Key present:", !!openaiApiKey);
  }

  /**
   * Create a new chat
   */
  async createChat() {
    try {
      console.log("Creating local chat with baseId:", this.baseId);

      // Generate a unique chat ID
      const chatId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create chat object
      const chat = {
        id: chatId,
        baseId: this.baseId,
        createdAt: new Date().toISOString(),
        messages: [],
      };

      // Store chat
      this.chats.set(chatId, chat);
      this.messages.set(chatId, []);

      console.log("✅ Local chat created successfully!");
      console.log("  Chat ID:", chatId);

      return {
        id: chatId,
        baseId: this.baseId,
        createdAt: chat.createdAt,
      };
    } catch (error) {
      console.error("❌ CREATE CHAT ERROR:", error.message);
      throw new Error(`Failed to create chat: ${error.message}`);
    }
  }

  /**
   * Get chat with messages
   */
  async getChat(chatId) {
    try {
      console.log("Getting local chat:", chatId);

      const chat = this.chats.get(chatId);
      if (!chat) {
        throw new Error(`Chat not found: ${chatId}`);
      }

      const messages = this.messages.get(chatId) || [];

      console.log("✅ Chat retrieved successfully!");
      console.log("  Messages count:", messages.length);

      return {
        id: chat.id,
        baseId: chat.baseId,
        createdAt: chat.createdAt,
        messages: messages,
      };
    } catch (error) {
      console.error("❌ GET CHAT ERROR:", error.message);
      throw new Error(`Failed to get chat: ${error.message}`);
    }
  }

  /**
   * Post message to chat
   */
  async postMessage(chatId, content, jsonSchema = null) {
    try {
      console.log("Posting message to local chat:", chatId);
      console.log("  Content:", content.substring(0, 50) + "...");

      const chat = this.chats.get(chatId);
      if (!chat) {
        throw new Error(`Chat not found: ${chatId}`);
      }

      const messages = this.messages.get(chatId) || [];

      // Create user message
      const userMessage = {
        id: `msg_${Date.now()}_user`,
        role: "user",
        content: content,
        createdAt: new Date().toISOString(),
      };

      // Create mock assistant response
      const assistantMessage = {
        id: `msg_${Date.now()}_assistant`,
        role: "assistant",
        content: `This is a mock response to: "${content.substring(0, 50)}..."`,
        createdAt: new Date().toISOString(),
      };

      // Add messages
      messages.push(userMessage);
      messages.push(assistantMessage);
      this.messages.set(chatId, messages);

      console.log("✅ Message posted successfully!");
      console.log("  User message ID:", userMessage.id);
      console.log("  Assistant message ID:", assistantMessage.id);

      return {
        userMessage: userMessage,
        assistantMessage: assistantMessage,
      };
    } catch (error) {
      console.error("❌ POST MESSAGE ERROR:", error.message);
      throw new Error(`Failed to post message: ${error.message}`);
    }
  }

  /**
   * Process query without chat
   */
  async processQuery(content, jsonSchema = null) {
    try {
      console.log("Processing local query");
      console.log("  Content:", content.substring(0, 50) + "...");

      const response = {
        id: `query_${Date.now()}`,
        content: `Mock response to: "${content.substring(0, 50)}..."`,
        createdAt: new Date().toISOString(),
      };

      console.log("✅ Query processed successfully!");

      return response;
    } catch (error) {
      console.error("❌ PROCESS QUERY ERROR:", error.message);
      throw new Error(`Failed to process query: ${error.message}`);
    }
  }

  /**
   * Delete chat
   */
  async deleteChat(chatId) {
    try {
      console.log("Deleting local chat:", chatId);

      const chat = this.chats.get(chatId);
      if (!chat) {
        throw new Error(`Chat not found: ${chatId}`);
      }

      this.chats.delete(chatId);
      this.messages.delete(chatId);

      console.log("✅ Chat deleted successfully!");

      return { success: true, message: "Chat deleted" };
    } catch (error) {
      console.error("❌ DELETE CHAT ERROR:", error.message);
      throw new Error(`Failed to delete chat: ${error.message}`);
    }
  }
}

