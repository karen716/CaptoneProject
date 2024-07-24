const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { broadcast } = require('./websocketServer');
const { initWebSocketNotifServer, broadcastNotification } = require('./webSocketServerNotif');

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from 'uploads' directory
app.use('/new/uploads', express.static(path.join(__dirname, 'uploads')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reporting'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('MySQL connected...');
});

const server = http.createServer(app);
initWebSocketNotifServer(server);

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send('Username and password are required');
    return;
  }

  const sql = 'SELECT * FROM residents WHERE username = ? AND password = ?';

  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Server error');
      return;
    }
    if (result.length > 0) {
      const user = result[0];
      res.json({ success: true, userId: user.id, message: 'Login successful' });
    } else {
      res.status(401).send('Invalid credentials');
    }
  });
});

app.post('/signup', (req, res) => {
  const {
    fullName,
    birthDate,
    barangay,
    phoneNumber,
    proofOfResidency,
    emailAddress,
    username,
    password,
    gender
  } = req.body;

  // Perform any additional validation if needed

  const sql = 'INSERT INTO residents (fullname, birthdate, barangay, phone, residency, email, username, password, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [fullName, birthDate, barangay, phoneNumber, proofOfResidency, emailAddress, username, password, gender], (err, result) => {
    if (err) {
      console.error('Error saving resident:', err);
      res.status(500).send('Error saving data');
      return;
    }
    console.log('New resident added:', result);
    res.status(200).send('Sign up successful');
  });
});

app.get('/barangays', (req, res) => {
  const sql = 'SELECT id, barangay FROM barangay';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching barangays:', err);
      res.status(500).send('Error fetching barangays');
      return;
    }
    res.json(results);
  });
});

app.post('/submitReport', (req, res) => {
  const {
    userId,
    category,
    victimName,
    victimAddress,
    victimContact,
    file,
    witnessName,
    witnessContact,
    crimeDate,
    crimeTime,
    crimeDescription,
    injuryOrDamages,
    location,
    evidenceFile,
  } = req.body;

  // Directly use witnessName and witnessContact if they are already comma-separated strings
  const witnessNames = typeof witnessName === 'string' ? witnessName : '';
  const witnessContacts = typeof witnessContact === 'string' ? witnessContact : '';

  const sql = 'INSERT INTO reports (user_id, category, name, address, contact, valid_id, witness, witnessNo, crimeDate, time, description, injury, location, evidence) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

  db.query(sql, [userId, category, victimName, victimAddress, victimContact, file, witnessNames, witnessContacts, crimeDate, crimeTime, crimeDescription, injuryOrDamages, location, evidenceFile], (err, result) => {
    if (err) {
      console.error('Error saving report:', err);
      res.status(500).send('Error saving data');
      return;
    }
    console.log('New report added:', result);
    res.status(200).send('Report submitted successfully');
  });
});

app.post('/submitEmergency', (req, res) => {
  const { combinedLocation } = req.body;

  const sql = 'INSERT INTO emergency (location) VALUES (?)';
  db.query(sql, [combinedLocation], (err, result) => {
    if (err) {
      console.error('Error saving emergency report:', err);
      res.status(500).send('Error saving data');
      return;
    }
    console.log('New emergency report added:', result);

    // Broadcasting the emergency alert
    broadcast(JSON.stringify({
      type: 'emergencyAlert',
      data: {
        combinedLocation,
      }
    }));

    res.status(200).send('Emergency report submitted successfully');
  });
});

app.get('/notifications', (req, res) => {
  const userId = req.query.user_id; // Retrieve user_id from query parameters
  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  const query = 'SELECT * FROM files WHERE user_id = ? ORDER BY time DESC';
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);

    // Broadcasting the notification
    results.forEach(notification => broadcastNotification(notification));
  });
});

app.get('/reports', (req, res) => {
  const userId = req.query.user_id;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const query = 'SELECT * FROM reports WHERE user_id = ?;';
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching reports:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No reports found for this user' });
    }

    res.json(results); // Send the entire array of reports
  });
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
