require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.set('trust proxy', 1);
app.use(express.json({ limit: '32kb' }));
app.use(express.urlencoded({ extended: true, limit: '32kb' }));

const allowedOrigins = (process.env.CORS_ORIGIN || '*')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (
        !origin ||
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin)
      ) {
        return cb(null, true);
      }
      return cb(new Error(`CORS blocked: ${origin}`));
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: false,
  })
);

// ── Routes ──────────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Muhammad Bilal — Portfolio API</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      :root { color-scheme: dark; }
      body {
        margin: 0; min-height: 100vh; display: grid; place-items: center;
        font: 15px/1.55 Inter, system-ui, sans-serif; color: #e2e8f0;
        background:
          radial-gradient(900px 500px at 10% -10%, rgba(99,102,241,.35), transparent 60%),
          radial-gradient(700px 500px at 100% 10%, rgba(34,211,238,.25), transparent 60%),
          #070712;
      }
      .card {
        max-width: 560px; padding: 28px 28px 22px; border-radius: 18px;
        background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1);
        backdrop-filter: blur(16px); box-shadow: 0 30px 80px -30px rgba(0,0,0,.6);
      }
      .pill {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600;
        color: #6ee7b7; background: rgba(16,185,129,.12); border: 1px solid rgba(16,185,129,.25);
      }
      .dot { width: 8px; height: 8px; border-radius: 999px; background: #34d399; box-shadow: 0 0 0 4px rgba(52,211,153,.15); }
      h1 { margin: 14px 0 6px; font-size: 22px; }
      p  { margin: 6px 0; color: #94a3b8; }
      a  { color: #67e8f9; text-decoration: none; font-weight: 600; }
      a:hover { color: #a5f3fc; }
      code { background: rgba(255,255,255,.06); padding: 2px 6px; border-radius: 6px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; }
      .row { margin-top: 16px; display: flex; gap: 10px; flex-wrap: wrap; }
    </style>
  </head>
  <body>
    <div class="card">
      <span class="pill"><span class="dot"></span> API is running</span>
      <h1>Muhammad Bilal — Portfolio API</h1>
      <p>This port (<code>:${PORT}</code>) serves the backend only.</p>
      <p>The portfolio site lives on
        <a href="http://localhost:5173" target="_blank" rel="noreferrer">http://localhost:5173</a>.
      </p>
      <div class="row">
        <a href="/api/health">/api/health</a>
        <span style="color:#475569">·</span>
        <a href="http://localhost:5173" target="_blank" rel="noreferrer">Open the site →</a>
      </div>
    </div>
  </body>
</html>`);
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/contact', contactRoutes);

// 404 + error handlers
app.use(notFound);
app.use(errorHandler);

// ── Bootstrap ───────────────────────────────────────────────────────────────
async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`[server] API ready on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('[server] Failed to start:', err.message);
    process.exit(1);
  }
}

start();
