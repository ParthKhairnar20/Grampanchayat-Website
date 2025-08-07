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
import mime from 'mime-types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const app = express();
app.use(cors());
app.use(express.json());

// Configure static file serving and SPA routing
const distPath = path.join(projectRoot, 'dist');

// Always serve uploaded files
app.use('/uploads', express.static(path.join(projectRoot, 'uploads')));
app.use('/gallery_uploads', express.static(path.join(projectRoot, 'gallery_uploads')));

// Serve static files from dist in production
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode');
  
  // Serve the static files from the React app
  app.use(express.static(distPath));

  // Set up client-side routing paths
  const routes = ['/', '/about', '/contact', '/events', '/gallery', '/services'];
  routes.forEach(route => {
    app.get(route, (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  });
  
  // These routes are already handled by the routes.forEach above, so we can remove the duplicates
  // keeping just the routes array to handle all client-side routing
}

// PostgreSQL connection configuration
const db = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'grampanchayat',
  password: process.env.DB_PASSWORD || 'India@11',
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait when connecting a new client
});

// Database connection error handling
db.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test database connection
const testDbConnection = async () => {
  try {
    const client = await db.connect();
    console.log('Successfully connected to PostgreSQL database');
    client.release();
  } catch (err) {
    console.error('Database connection error:', err.message);
    console.error('Please make sure PostgreSQL is running and the credentials are correct');
    process.exit(-1);
  }
};

testDbConnection();

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

console.log("👀 DEBUG: Registering routes...");

// Upload endpoint
console.log("➡️ Registering POST /upload");
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
console.log("➡️ Registering GET /documents");
app.get('/documents', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM documents ORDER BY uploaded_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Delete document endpoint
console.log("➡️ Registering DELETE /documents");
app.delete('/documents', verifyAdmin, async (req, res) => {
  const id = req.query.id;
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
console.log("➡️ Registering POST /gallery/upload");
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
console.log("➡️ Registering GET /gallery/photos");
app.get('/gallery/photos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM gallery_photos ORDER BY uploaded_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Gallery Photo Delete endpoint
console.log("➡️ Registering DELETE /gallery/photos/:id");
app.delete('/gallery/photos', async (req, res) => {
  const id = req.query.id;
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
console.log("➡️ Registering POST /api/register-admin");
app.post('/api/register-admin', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO admins (username, password) VALUES ($1, $2)', [username, hashed]);
  res.send({ success: true });
});

// Admin login
console.log("➡️ Registering POST /api/admin-login");
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
console.log("➡️ Registering POST /api/contact");
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
console.log("➡️ Registering GET /api/contact-messages");
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

// Note: Upload routes are already configured at the top of the file

// Serve React app in production (must be last)
if (process.env.NODE_ENV === 'production') {
  // Serve static files from dist folder with proper MIME types
  console.log("➡️ Registering production static file serving from /dist");
  app.use(express.static(path.join(projectRoot, 'dist'), {
  setHeaders: (res, filePath) => {
    const contentType = mime.lookup(filePath);
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    } else {
      res.setHeader('Content-Type', 'application/octet-stream'); // fallback
    }
  }
}));
  
  // Handle all other routes by serving index.html (for React Router)
  // This must be the last route to avoid conflicts with API routes
  console.log("➡️ Registering catch-all * route for React Router");
  app.get('*', (req, res) => {
    res.sendFile(path.join(projectRoot, 'dist', 'index.html'));
  });
}
// Wait until all routes are registered before accessing them
setTimeout(() => {
  console.log("🔍 Routes registered in Express:");
  if (app._router && app._router.stack) {
    app._router.stack.forEach((layer) => {
      if (layer.route && layer.route.path) {
        console.log("➡️", layer.route.path);
      } else if (layer.name === 'router' && layer.handle.stack) {
        layer.handle.stack.forEach((nested) => {
          if (nested.route && nested.route.path) {
            console.log("➡️", nested.route.path);
          }
        });
      }
    });
  } else {
    console.log("⚠️ No routes found on app._router");
  }
}, 0);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(`Website available at: http://localhost:${PORT}`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('✅ Running in production mode - Serving static files from dist directory');
  } else {
    console.log('ℹ️ Running in development mode');
  }
});