import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const DB_PATH = path.join(__dirname, 'players.json');
const QUESTIONS_PATH = path.join(__dirname, 'questions.json');

// Inicializar players.json se não existir
async function initDB() {
  try {
    await fs.access(DB_PATH);
  } catch {
    await fs.writeFile(DB_PATH, JSON.stringify([]));
  }
}

// Ler dados do arquivo
async function readData(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

// Salvar dados no arquivo
async function saveData(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Rotas
app.get('/questions', async (req, res) => {
  try {
    const questions = await readData(QUESTIONS_PATH);
    const { level } = req.query;
    
    if (level) {
      const filtered = questions.filter(q => q.level === parseInt(level));
      return res.json(filtered);
    }
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar perguntas' });
  }
});

app.post('/player', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'O nome do herói é obrigatório' });
    }

    const players = await readData(DB_PATH);
    // Busca se já existe um jogador com esse nome para "reentrar"
    let player = players.find(p => p.name.toLowerCase() === name.toLowerCase());

    if (!player) {
      player = {
        id: uuidv4(),
        name,
        totalScore: 0,
        levelsCompleted: [],
        badges: [],
        createdAt: new Date().toISOString()
      };
      players.push(player);
      await saveData(DB_PATH, players);
    }

    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar jogador' });
  }
});

// Remover rota de login e reset-password pois não há mais senha
app.delete('/login', (req, res) => res.status(404).end());
app.delete('/reset-password', (req, res) => res.status(404).end());

app.post('/score', async (req, res) => {
  try {
    const { id, level, score, totalQuestions, badge } = req.body;
    const players = await readData(DB_PATH);
    const playerIndex = players.findIndex(p => p.id === id);

    if (playerIndex === -1) {
      return res.status(404).json({ error: 'Jogador não encontrado' });
    }

    const percentage = (score / totalQuestions) * 100;
    
    // Atualizar pontuação e níveis
    players[playerIndex].totalScore += score;
    
    if (percentage >= 70) {
      if (!players[playerIndex].levelsCompleted.includes(level)) {
        players[playerIndex].levelsCompleted.push(level);
        if (badge) {
          players[playerIndex].badges.push({
            name: badge,
            level,
            date: new Date().toISOString()
          });
        }
      }
    }

    await saveData(DB_PATH, players);
    res.json(players[playerIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar pontuação' });
  }
});

app.get('/ranking', async (req, res) => {
  try {
    const players = await readData(DB_PATH);
    const ranking = players
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10);
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao carregar ranking' });
  }
});

app.listen(PORT, async () => {
  await initDB();
  console.log(`🚀 Servidor gameKis rodando em http://localhost:${PORT}`);
});
