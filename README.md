# Patoks Na Manok - Sales & Chicken Inventory System

A simple, dependable browser-based sales and chicken inventory system designed for grilled chicken businesses.

## Quick Start (Local LAN Hosting)
1. Install [Node.js](https://nodejs.org/).
2. Open Terminal / Command Prompt in this directory.
3. Run:
   ```bash
   node server.js
   ```
4. Access the web app in your browser at `http://localhost:3000` or via the LAN IP displayed in terminal.

## Deploying to Render.com
1. Create a GitHub repository and upload `index.html`, `server.js`, and `package.json`.
2. Log into [Render.com](https://render.com) and create a **New Web Service**.
3. Connect your GitHub repository.
4. Set runtime to **Node**, start command to `node server.js`.
5. Deploy and access your live URL!

## System Features
- Immutable Transaction Ledger (Raw, Prepared, Total Chicken Tracking).
- Role-Based Access Control (Owner & Cashier accounts with secure PBKDF2/SHA-256 hashing).
- Asia/Manila Timezone Business Date & Timestamping.
- Reversals & Audit Logs for record corrections.
- Built-in Automated 10-Step Acceptance Test Runner.
- Offline-ready Local Storage & Data Export/Import (JSON Backup & Restore).
