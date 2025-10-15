const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
console.log('here');

app.get('/', (re, res) => {
    return res.json("From Backend Side");
});

app.get('/lyrics', (req, res) => {
    const sql = "SELECT * FROM lyrics"
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/lyrics', (req, res) => {
    const {songName, artistName, verses} = req.body;
    const sql = "INSERT INTO lyrics(songName, artistName, verses) VALUES(?, ?, ?)"
    db.query(sql, [songName, artistName, verses], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post('/getLyric', (req, res) => {
    const {songName, artistName} = req.body;
    const sql = "SELECT s.verses FROM lyrics AS s WHERE s.songName = ? AND s.artistName = ?";
    db.query(sql, [songName, artistName], (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("listening");
});