const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let groups = [];

app.post('/generate-groups', (req, res) => {
  const names = req.body.names;

  // 洗牌算法，將人名打亂
  for (let i = names.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [names[i], names[j]] = [names[j], names[i]];
  }

  // 生成分組
  groups = [];
  for (let i = 0; i < names.length; i += 2) {
    const group = [names[i], names[i + 1]];
    groups.push(group);
  }

  res.json({ success: true, groups });
});

app.post('/record-score', (req, res) => {
  const { groupIndex, score } = req.body;
  groups[groupIndex].score = score;
  res.json({ success: true });
});

app.get('/get-groups', (req, res) => {
  res.json(groups);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
