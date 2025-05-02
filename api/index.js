// Serverless API handler for Vercel
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchUserRepositories } from '../server/services/github.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());

// API Routes
app.get('/api/github/:username/repos', async (req, res) => {
  try {
    const { username } = req.params;
    const repos = await fetchUserRepositories(username);
    res.json(repos);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    res.status(500).json({ message: errorMessage });
  }
});

// Contact form submission route
app.post('/api/contact', (req, res) => {
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

// Serve static files
const publicPath = path.join(__dirname, '../dist/public');
app.use(express.static(publicPath));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the server if not in a serverless environment
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for serverless
export default app;