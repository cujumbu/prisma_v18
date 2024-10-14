import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.get('/api/claims', async (req, res) => {
  try {
    const claims = await prisma.claim.findMany();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching claims' });
  }
});

app.post('/api/claims', async (req, res) => {
  try {
    const newClaim = await prisma.claim.create({
      data: req.body
    });
    res.json(newClaim);
  } catch (error) {
    res.status(500).json({ error: 'Error creating claim' });
  }
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});