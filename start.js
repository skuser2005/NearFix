const { spawn } = require('child_process');
const http = require('http');
const path = require('path');

// Lightweight .env loader so the project works without an extra dependency.
const envPath = path.join(__dirname, '.env');
try {
  if (require('fs').existsSync(envPath)) {
    for (const line of require('fs').readFileSync(envPath, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
    }
  }
} catch {}

const startPort = Number(process.env.PORT || 5050);
const backend = spawn(process.execPath, [path.join(__dirname, 'backend', 'server.js')], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: { ...process.env, PORT: String(startPort) }
});

let opened = false;
function openBrowser(url) {
  if (opened) return;
  opened = true;
  const command = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open';
  const args = process.platform === 'win32' ? ['/c', 'start', '', url] : [url];
  spawn(command, args, { detached: true, stdio: 'ignore' }).unref();
  console.log(`\nNearFix is ready: ${url}`);
}
function check(port, tries = 0) {
  if (tries > 15 || opened) return;
  const req = http.get({host:'127.0.0.1', port, path:'/api/health', timeout:300}, res => {
    res.resume();
    if (res.statusCode === 200) return openBrowser(`http://localhost:${port}`);
    setTimeout(() => check(port + 1, tries + 1), 150);
  });
  req.on('error', () => setTimeout(() => check(port + 1, tries + 1), 150));
  req.on('timeout', () => { req.destroy(); setTimeout(() => check(port + 1, tries + 1), 150); });
}
backend.stdout.on('data', chunk => { process.stdout.write(chunk); check(startPort); });
backend.stderr.on('data', chunk => process.stderr.write(chunk));
backend.on('exit', code => process.exit(code ?? 0));
setTimeout(() => check(startPort), 300);
process.on('SIGINT', () => backend.kill('SIGINT'));
process.on('SIGTERM', () => backend.kill('SIGTERM'));
