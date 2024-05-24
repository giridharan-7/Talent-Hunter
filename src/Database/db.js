const express = require ('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors({
    origin: 'http://localhost:3000',
    // Other options as needed
  }));
const pool = mysql.createPool({
  host: 'localhost',
  user: 'mysql',
  password: 'Google/45',
  database: 'skill',
});


app.get('/checkskill/:skill', (req, res) => {
    let skillToCheck = req.params.skill;
  
    // Remove curly braces if present
    skillToCheck = skillToCheck.replace(/[{}]/g, '');
    console.log(skillToCheck);
    const query = 'SELECT COUNT(*) AS count FROM get_skill WHERE name = ?';
    pool.query(query, [skillToCheck], (error, results) => {
      if (error) {
        console.error('Error checking skill:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      const skillExists = results[0].count > 0;
      console.log('Skill exists:', skillExists);
      res.json({ skillExists });
    });
  });
  
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
