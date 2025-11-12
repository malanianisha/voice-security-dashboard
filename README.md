# 🛡️ Voice Security / Fraud Detection Dashboard

This project is an **interactive web dashboard** that visualizes fraudulent and suspicious call activity across telecom networks.  
It helps analysts monitor threat levels, identify fraud patterns, and track how inbound calls are being filtered in real time.

---

## 🎯 What It Does

The dashboard shows:
- **Fraud type distribution** – Spoofed calls, robocalls, IRSF, Wangiri attempts, etc.  
- **Severity levels** – Suspicious, significant, and critical categories.  
- **Call treatment** – Which calls were allowed, flagged, or blocked.  
- **Geographic map** – Interactive map showing the origin of suspicious activity.  
- **Time & carrier trends** – Identify patterns by time of day or carrier.

---

## 🧠 Why I Built It

I created this dashboard to act as the **visual analytics layer** for an enterprise call filtering system.  
The backend handles fraud detection, while this dashboard turns that raw data into visuals that make it easy to understand and act on.

---

## 🧱 Tools and Technologies

| Layer | Tools |
|-------|-------|
| Frontend | React + TypeScript (Vite) |
| Charts | Recharts |
| Maps | Leaflet + React-Leaflet |
| Styling | CSS Grid + Flexbox |
| Data Source | Local CSV data (can be connected to live APIs later) |

---

## ⚙️ How to Run It

If you have Node.js installed:

```bash
npm install
npm run dev

## 📄 Project Documents

- [📘 Voice Security Dashboard Project Summary (PDF)](docs/Voice%20Security%20Dashboard%20Summary.pdf)
- [📊 Enterprise Inbound Call Filtering (PPTX)](docs/Enterprise%20Inbound%20Call%20Filtering.pptx)


🚀 Future Plans
Connect to live Forensics Server API

Add user authentication

Include notifications for fraud spikes

Add export options (CSV or PDF reports)

Integrate AI-based anomaly detection
**Author:** Anisha Malani  
**Date:** November 2025  
**Repository:** `voice-security-dashboard`
