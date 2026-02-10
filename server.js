import express from 'express';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'trixor2025';

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Login
app.post('/api/auth', (req, res) => {
  if (req.body.password === ADMIN_PASSWORD) {
    res.json({ token: ADMIN_PASSWORD });
  } else {
    res.status(401).json({ error: 'Wrong password' });
  }
});

// Read data JSON
app.get('/api/data/:file', auth, (req, res) => {
  try {
    const filePath = join(__dirname, 'data', `${req.params.file}.json`);
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    res.json(data);
  } catch (e) {
    res.status(404).json({ error: 'File not found' });
  }
});

// Write data JSON
app.post('/api/data/:file', auth, (req, res) => {
  try {
    const filePath = join(__dirname, 'data', `${req.params.file}.json`);
    writeFileSync(filePath, JSON.stringify(req.body, null, 2), 'utf-8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Write failed' });
  }
});

// Read translation JSON
app.get('/api/locales/:lang', auth, (req, res) => {
  try {
    const filePath = join(__dirname, 'src', 'locales', req.params.lang, 'translation.json');
    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    res.json(data);
  } catch (e) {
    res.status(404).json({ error: 'Language not found' });
  }
});

// Write translation JSON
app.post('/api/locales/:lang', auth, (req, res) => {
  try {
    const filePath = join(__dirname, 'src', 'locales', req.params.lang, 'translation.json');
    writeFileSync(filePath, JSON.stringify(req.body, null, 2), 'utf-8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Write failed' });
  }
});

// List available languages
app.get('/api/locales', auth, (req, res) => {
  try {
    const localesDir = join(__dirname, 'src', 'locales');
    const langs = readdirSync(localesDir).filter(f => !f.startsWith('.'));
    res.json(langs);
  } catch (e) {
    res.status(500).json({ error: 'Failed to list languages' });
  }
});

app.listen(3001, () => {
  console.log('CMS API running on http://localhost:3001');
});
