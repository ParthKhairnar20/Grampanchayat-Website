// server.js
import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection (Supabase)
const db = new Pool({
  connectionString: process.env.SUPABASE_DB_URL || 'your-supabase-database-url-here',
  ssl: { rejectUnauthorized: false }
});

// Multer setup for documents (existing)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(projectRoot, 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Multer setup for gallery photos (new)
const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(projectRoot, 'gallery_uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const galleryUpload = multer({ storage: galleryStorage });

// Upload endpoint
app.post('/upload', upload.single('file'), async (req, res) => {
  const { originalname, mimetype, size, filename } = req.file;
  const url = `http://localhost:5000/uploads/${filename}`;
  const uploaded_by = req.body.uploaded_by || null;
  const description = req.body.description || null;
  const type = req.body.type || null;
  try {
    await db.query(
      'INSERT INTO documents (name, url, mimetype, size, uploaded_by, description, type, uploaded_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())',
      [originalname, url, mimetype, size, uploaded_by, description, type]
    );
    console.log('Inserted into DB:', originalname, url);
    res.json({ name: originalname, url });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: err });
  }
});

// List documents endpoint
app.get('/documents', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM documents ORDER BY uploaded_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Delete document endpoint
app.delete('/documents/:id', verifyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    // Get the file URL from the database
    const result = await db.query('SELECT url FROM documents WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    const fileUrl = result.rows[0].url;
    const filePath = path.join(projectRoot, 'uploads', path.basename(fileUrl));
    // Delete the file from the uploads folder
    fs.unlink(filePath, (err) => {
      if (err) console.error('File delete error:', err);
    });
    // Delete the row from the database
    await db.query('DELETE FROM documents WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: err });
  }
});

// Gallery Photo Upload endpoint
app.post('/gallery/upload', galleryUpload.single('file'), async (req, res) => {
  const { originalname, mimetype, size, filename } = req.file;
  const url = `http://localhost:5000/gallery_uploads/${filename}`;
  const uploaded_by = req.body.uploaded_by || null;
  const description = req.body.description || null;
  try {
    await db.query(
      'INSERT INTO gallery_photos (name, url, mimetype, size, uploaded_by, description, uploaded_at) VALUES ($1, $2, $3, $4, $5, $6, NOW())',
      [originalname, url, mimetype, size, uploaded_by, description]
    );
    res.json({ name: originalname, url });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Gallery Photo List endpoint
app.get('/gallery/photos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM gallery_photos ORDER BY uploaded_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Gallery Photo Delete endpoint
app.delete('/gallery/photos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT url FROM gallery_photos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    const fileUrl = result.rows[0].url;
    const filePath = path.join(projectRoot, 'gallery_uploads', path.basename(fileUrl));
    fs.unlink(filePath, (err) => {
      if (err) console.error('File delete error:', err);
    });
    await db.query('DELETE FROM gallery_photos WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Register admin (run once, then remove/disable for security)
app.post('/api/register-admin', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO admins (username, password) VALUES ($1, $2)', [username, hashed]);
  res.send({ success: true });
});

// Admin login
app.post('/api/admin-login', async (req, res) => {
  const { username, password } = req.body;
  const result = await db.query('SELECT * FROM admins WHERE username = $1', [username]);
  const admin = result.rows[0];
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  // Log the login event in admin_logins table
  await db.query('INSERT INTO admin_logins (admin_username) VALUES ($1)', [admin.username]);

  // Update last_login field in admins table
  await db.query('UPDATE admins SET last_login = NOW() WHERE id = $1', [admin.id]);

  const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '2h' });
  res.json({ token });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  try {
    await db.query(
      'INSERT INTO contact_messages (name, email, phone, subject, message, submitted_at) VALUES ($1, $2, $3, $4, $5, NOW())',
      [name, email, phone, subject, message]
    );
    
    console.log('Contact form submitted:', { name, email, subject });
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// Get contact messages (admin only)
app.get('/api/contact-messages', verifyAdmin, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM contact_messages ORDER BY submitted_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Middleware to verify admin JWT
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Serve uploaded files
app.use('/uploads', express.static(path.join(projectRoot, 'uploads')));
// Serve gallery uploaded files
app.use('/gallery_uploads', express.static(path.join(projectRoot, 'gallery_uploads')));

app.listen(5000, () => console.log('Server started on port 5000'));