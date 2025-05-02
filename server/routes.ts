import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { fetchUserRepositories } from "./services/github";

export async function registerRoutes(app: Express): Promise<Server> {
  // GitHub API routes
  app.get("/api/github/:username/repos", async (req, res) => {
    try {
      const { username } = req.params;
      const repos = await fetchUserRepositories(username);
      res.json(repos);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json({ message: errorMessage });
    }
  });

  // Contact form submission route - For demonstration only
  // In a real application, you might want to implement email sending functionality
  app.post("/api/contact", (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
      
      // In a real application, send an email here
      console.log("Contact form submission:", { name, email, subject, message });
      
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      res.status(500).json({ message: errorMessage });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
