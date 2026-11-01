import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const backendDir = path.join(root, 'backend')
const frontendDir = path.join(root, 'frontend')

function findPython() {
  const venvPythonWin = path.join(backendDir, '.venv', 'Scripts', 'python.exe')
  const venvPythonUnix = path.join(backendDir, '.venv', 'bin', 'python')
  const venvPythonWin2 = path.join(root, 'venv', 'Scripts', 'python.exe')
  const venvPythonUnix2 = path.join(root, 'venv', 'bin', 'python')
  
  if (existsSync(venvPythonWin)) return venvPythonWin
  if (existsSync(venvPythonUnix)) return venvPythonUnix
  if (existsSync(venvPythonWin2)) return venvPythonWin2
  if (existsSync(venvPythonUnix2)) return venvPythonUnix2
  
  if (process.env.PYTHON) return process.env.PYTHON
  return process.platform === 'win32' ? 'python' : 'python3'
}

const python = findPython()
console.log(`[Launcher] Using Python: ${python}`)

const api = spawn(python, ['-m', 'uvicorn', 'app.main:app', '--reload', '--host', '127.0.0.1', '--port', '8000'], { 
  cwd: backendDir, 
  stdio: 'inherit',
  windowsHide: true
})

const viteCli = path.join(frontendDir, 'node_modules', 'vite', 'bin', 'vite.js')
if (!existsSync(viteCli)) {
  console.error('[Frontend] ERROR: vite not found. Run "npm install" in frontend/ directory.')
  process.exit(1)
}

const web = spawn(process.execPath, [viteCli, '--host', '127.0.0.1'], { 
  cwd: frontendDir, 
  stdio: 'inherit',
  windowsHide: true
})

let stopping = false
function stop(code = 0) {
  if (stopping) return
  stopping = true
  console.log('\n[Launcher] Stopping services...')
  for (const child of [api, web]) {
    if (child.exitCode === null && !child.killed) {
      try {
        child.kill('SIGINT')
      } catch (e) {
        try {
          child.kill()
        } catch {}
      }
    }
  }
  setTimeout(() => process.exit(code), 1000)
}

api.on('error', error => { 
  console.error(`[Backend] ERROR: Could not start - ${error.message}`)
  console.error('[Backend] Check: Python installed? Dependencies installed in backend/? Run: pip install -r backend/requirements.txt')
  stop(1) 
})
web.on('error', error => { 
  console.error(`[Frontend] ERROR: Could not start - ${error.message}`)
  console.error('[Frontend] Check: Node/npm installed? Dependencies installed in frontend/? Run: npm install in frontend/')
  stop(1) 
})
api.on('exit', code => { 
  if (!stopping) {
    console.error(`[Backend] Exited with code ${code}`)
    if (code !== 0) stop(code || 1)
  }
})
web.on('exit', code => { 
  if (!stopping) {
    console.error(`[Frontend] Exited with code ${code}`)
    if (code !== 0) stop(code || 1)
  }
})

process.on('SIGINT', () => stop(0))
process.on('SIGTERM', () => stop(0))

console.log('[Launcher] Starting PromptGuard services...')
console.log('[Launcher] Frontend: http://localhost:5173')
console.log('[Launcher] Backend:  http://127.0.0.1:8000')
console.log('[Launcher] API Docs:  http://127.0.0.1:8000/docs')
console.log('[Launcher] Press Ctrl+C to stop both services')
