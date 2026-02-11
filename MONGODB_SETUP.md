# ⚠️ MongoDB Setup Required

The application needs MongoDB to run. Here are your options:

## Option 1: Use MongoDB Atlas (Cloud Database) ✅ Recommended

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Click "Sign Up" (free tier available)
   - Create an organization and project

2. **Create a Cluster**
   - Click "Create" to build a cluster
   - Choose "Dedicated" or "Shared" (Free tier)
   - Select region (any region works)
   - Wait for cluster to be created (~5-10 minutes)

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `jobportaluser`
   - Password: `SecurePass123!`
   - Click "Add User"

4. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect" button
   - Choose "Drivers"
   - Copy the connection string
   - It will look like: `mongodb+srv://jobportaluser:SecurePass123!@cluster.mongodb.net/jobportal`

5. **Update .env**
   - Open `backend/.env`
   - Replace `MONGO_URI` with your connection string from step 4
   - Example:
     ```
     MONGO_URI=mongodb+srv://jobportaluser:SecurePass123!@cluster0.j5xyz.mongodb.net/jobportal
     ```

6. **Allow Network Access**
   - In MongoDB Atlas, go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Click "Confirm"

---

## Option 2: Use Local MongoDB

### Windows

1. **Download & Install**
   - Visit https://www.mongodb.com/try/download/community
   - Download MongoDB Community Server (Windows)
   - Run installer and follow defaults
   - MongoDB will install as a Windows Service

2. **Verify Installation**
   - Open PowerShell as Administrator
   - Run: `mongod --version`
   - Should show version number

3. **Start MongoDB Service**
   - PowerShell as Administrator:
     ```
     net start MongoDB
     ```
   - Or use MongoDB Compass (GUI):
     - Search "MongoDB Compass" in Start Menu
     - Click "Connect" button
     - It will auto-start the service

4. .env is already set to: `MONGO_URI=mongodb://localhost:27017/jobportal`

### Mac

```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Verify
mongosh
> db.version()
```

### Linux

```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Verify
mongosh
```

---

## Next Steps After MongoDB Setup

Once MongoDB is running, go back to the project folder and run:

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: <server-name>
🚀 Server running on port 5000
```

Then in a new terminal:
```bash
cd frontend
npm run dev
```

Access the app at: **http://localhost:3000**

---

## Quick Test URLs

- 🎯 Application: http://localhost:3000
- 🔌 API Health: http://localhost:5000/api/health

---

⏱️ **Don't have time?** Use MongoDB Atlas (Option 1) - it takes 5-10 minutes setup!
