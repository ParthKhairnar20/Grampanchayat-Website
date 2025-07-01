// server.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'grampanchayat',
  password: 'India@11',
  port: 5432
});

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(projectRoot, 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

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
app.delete('/documents/:id', async (req, res) => {
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

// Serve uploaded files
app.use('/uploads', express.static(path.join(projectRoot, 'uploads')));

app.listen(5000, () => console.log('Server started on port 5000'));