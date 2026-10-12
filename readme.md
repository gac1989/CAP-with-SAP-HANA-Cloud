# 🚀 SAP CAP with SAP HANA Cloud

A full-stack business application built with **SAP Cloud Application Programming Model (CAP)**, backed by **SAP HANA Cloud**, secured with **XSUAA**, and exposed through a **SAP Fiori Elements** user interface for partner management and reporting.

---

## 💼 Business Use Case (Business Value)
In corporate environments, partner (business partner) data is often scattered, inconsistently maintained and accessible to everyone, which creates data quality issues and security risks. This application addresses that problem by centralizing partner management in a secure, enterprise-grade data model with **role-based access control**.

Users authenticate with their BTP identity and can only view or modify the data their roles allow. Reporting logic is pushed down to the database using native **SAP HANA** artifacts, keeping the application fast and scalable.

---

## 📸 Demo / Solution Flow

### 1. Create Partner & Item

<p align="center">
  <img src="https://github.com/user-attachments/assets/404ab733-ab3d-413c-b55a-13c43fe8b63a" width="49%" alt="Create Partner" title="Creating a new partner in the Fiori Elements UI" style="vertical-align: middle; margin-right: 1%;" />
  <img src="https://github.com/user-attachments/assets/a2dc26dd-9de2-4e56-a94e-ac09148fd15e" width="49%" alt="Create Item" title="Adding an item to the partner" style="vertical-align: middle;" />
</p>

### 2. List Report & Detail View

<p align="center">
  <img src="https://github.com/user-attachments/assets/c7eb167b-454b-4033-9a1a-9fc34a7a7571" width="49%" alt="Partners List Report" title="Partners list in table format with the newly created partner" style="vertical-align: middle; margin-right: 1%;" />
  <img src="https://github.com/user-attachments/assets/fd60d52a-576e-4088-b36f-2c058c1d901b" width="49%" alt="Partner Detail" title="Partner detail view (Object Page)" style="vertical-align: middle;" />
</p>

### 3. Persisted Data in SAP HANA Cloud

<p align="center">
  <img src="https://github.com/user-attachments/assets/8f849e3e-1996-48b0-abef-d6b7dc61035c" width="49%" alt="Header record in the database" title="Partner header record stored in SAP HANA Cloud" style="vertical-align: middle; margin-right: 1%;" />
  <img src="https://github.com/user-attachments/assets/b90870fc-e1bf-4403-bcc0-66ef09e2bd5b" width="49%" alt="Item records in the database" title="Item records stored in SAP HANA Cloud" style="vertical-align: middle;" />
</p>

---

## 🏗️ Solution Architecture

```text
[ SAP Fiori Elements UI (List Report + Object Page) ]
           │
           ▼ (Approuter + XSUAA Authentication)
[ SAP CAP Service (Node.js) ]
           │   • Authorization: @requires / @restrict (grant, where) / @readonly
           ▼ (HDI Container Binding)
[ SAP HANA Cloud ]
           • Tables & Views
           • Calculation Views
           • Stored Procedures
```

---

## ✨ Key Features

- **Full-stack CAP application** with domain models (`db/`), services (`srv/`) and UI (`app/`).
- **SAP HANA Cloud** as the persistence layer through an HDI container.
- **Native HANA artifacts:** Calculation Views and Stored Procedures.
- **Application-level security** with XSUAA (user authentication).
- **Route-level security** using CAP annotations: `@restrict` with `grant` / `where` conditions and `@readonly`, with role management.
- **SAP Fiori Elements** report UI: a table-based list of partners and an object page to view, create and edit them.

---

## 🛠️ Prerequisites

- **SAP Business Application Studio** (BAS).
- A running **SAP HANA Cloud (HDB) instance**.
- Login to **Cloud Foundry** with your BTP user.

### Project Structure

| File or Folder | Purpose |
| :--- | :--- |
| `app/` | Content for UI frontends goes here |
| `db/` | Your domain models and data go here |
| `srv/` | Your service models and code go here |
| `readme.md` | This getting started guide |

---

## ⚙️ Startup & Deployment

### 1. Clone and Install

1. **Clone the repository:**
```bash
   git clone https://github.com/gac1989/CAP-with-SAP-HANA-Cloud.git
```

2. **Install dependencies:**
```bash
   npm install
```

### 2. SAP HANA Cloud Setup

1. **Generate the HANA artifacts:**
```bash
   cds build --production
```
2. Bind your local project to the HANA database using the **SAP HANA Projects** panel.
3. From the wizard, select **Bind to an HDI container** > **Create a new service instance** > name it `MyHANAApp-dev-00`.
4. From the **SAP HANA Projects** panel, deploy to the HANA Cloud service.
5. **Generate mock data for testing:**
```bash
   cds add data --records 5
```
6. In your **HANA Database Explorer**, load the CSV files into their respective tables.
7. **Bind your local project to your HDB:**
```bash
   cds bind -2 MyHANAApp-dev-00:SharedDevKey
```

### 3. Security Setup (XSUAA)

1. **Create the XSUAA instance:**
```bash
   cf create-service xsuaa application MyHANAApp-auth -c xs-security.json
```
2. **Create the service key for the instance:**
```bash
   cf create-service-key MyHANAApp-auth default
```
3. **Bind your local project to the generated XSUAA:**
```bash
   cds bind -2 MyHANAApp-auth:default
```
4. **Install the Approuter packages:**
```bash
   npm install --prefix app/router
```

---

## 🧪 Testing the Application

Open two terminals in SAP Business Application Studio:

1. *(If necessary)* **Refresh your Approuter MTA module:**
```bash
   cds add approuter
```

2. **Terminal 1:** start the local CAP project connected to HANA:
```bash
   cds watch --profile hybrid
```

3. **Terminal 2:** start the Approuter and test the application:
```bash
   cds bind --exec -- npm start --prefix app/router
```

---
