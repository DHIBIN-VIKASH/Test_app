# Research Portfolio Dashboard 🚀

A futuristic, high-end interactive dashboard designed for tracking research publications. The application is permanently linked to an Excel backend (`RP.xlsx`), allowing for real-time synchronization of data and visual styling.

## ✨ Key Features

- **Futuristic Glassmorphism UI**: A premium dark-themed interface with neon accents, smooth animations (Framer Motion), and responsive design.
- **Excel Sync (CRUD)**: Fully interactive—add, edit, or delete publications directly from the browser. Changes are saved instantly to `RP.xlsx`.
- **Dynamic Styling**: 
  - **Mirror Excel Colors**: Status chips automatically inherit background and font colors from the Excel sheet.
  - **Keyword Mapping**: Auto-formatting for specific journals (e.g., Blue for European Spine Journal).
  - **Decision Glow**: High-priority status terms like "DE recommendation" or "EIC Decision" feature a pulsing neon glow.
  - **Glassy Row Highlights**: Papers marked with a Green background across all columns in Excel are highlighted with a special glassy shimmer and neon border.
- **Auto-Loading Header**: Automatically pulls Researcher and Guide information from the top rows of your spreadsheet.

## 🛠️ Technology Stack

- **Frontend**: React, Vite, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express.
- **Data Handling**: ExcelJS (Safe cell extraction and style-preserving updates).

## 🚀 Deployment (Option A - Render.com)

To host your dashboard on the web for free:

1. **Upload to GitHub**: Create a private repository on GitHub and push all files (except `node_modules`).
2. **Connect to Render**:
   - Create a free account on [Render.com](https://render.com).
   - Click **New +** > **Web Service**.
   - Connect your GitHub repository.
3. **Configure Settings**:
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. **Important**: Since this app uses a local Excel file for data, changes made on the web will be lost whenever the server restarts (Render puts free servers to sleep). To keep data permanent, it's recommended to continue using the local `npm run dev` for your primary work.

## 💻 Local Development
To run on your computer:
1. `npm install`
2. `npm run dev`

## 📋 Data Structure (`RP.xlsx`)

- **Row 1**: Researcher Name & Credentials.
- **Row 2**: Guide Name & Credentials.
- **Row 4 onwards**: Publication Data.
  - **Column A**: Paper ID.
  - **Column B**: Publication Title.
  - **Column C**: Journal Status (Supports background/font colors and keyword-based glow).

## ⚠️ Notes

- Ensure `RP.xlsx` is not open in Excel while the server is trying to save changes (this may cause a permission error).
- The "Glassy Highlight" is triggered in the UI when columns A, B, and C in Excel all share the same green color (`#00B050`).

---
*Created for Dr. DHIBIN VIKASH K P*
