const express = require('express');
const bodyParser = require('body-parser');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const app = express();
const PORT = 3000;

// CONFIGURATION
const BUCKET_NAME = 'assignment-1-data-bucket'; // Your specific bucket
const storage = new Storage(); // Uses the 'web-uploader' service account automatically

// MIDDLEWARE
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files

// ROUTE: Save Data
app.post('/api/save', async (req, res) => {
    const { username, password } = req.body;

    // 1. Validation (Robustness)
    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            message: "Missing username or password." 
        });
    }

    try {
        // 2. Create a unique filename (e.g., user-admin-1739999.json)
        // We sanitize the username to prevent weird file names
        const safeUsername = username.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileName = `user-${safeUsername}-${Date.now()}.json`;
        
        // 3. Prepare the file
        const file = storage.bucket(BUCKET_NAME).file(fileName);
        const data = JSON.stringify({ username, password, timestamp: new Date() }, null, 2);

        // 4. Upload to Google Cloud
        await file.save(data, {
            contentType: 'application/json',
            resumable: false 
        });

        console.log(`[SUCCESS] Saved ${fileName} to ${BUCKET_NAME}`);
        
        res.json({ 
            success: true, 
            message: "Data securely vaulted in Cloud Storage." 
        });

    } catch (error) {
        console.error("[ERROR] Storage failed:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error: Could not save data." 
        });
    }
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running securely on port ${PORT}`);
});
