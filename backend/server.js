import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.get('/status', async (req, res) => {
  try {
    const questionCount = await prisma.question.count();
    res.json({ 
      status: 'online', 
      questions: questionCount,
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Erro ao acessar o banco de dados' });
  }
});

// Rotas
app.get('/questions', async (req, res) => {
  try {
    const { level } = req.query;
    
    const questions = await prisma.question.findMany({
      where: level ? { level: parseInt(level.toString()) } : undefined
    });

    // Converter string JSON das opções de volta para array
    const formattedQuestions = questions.map(q => ({
      ...q,
      options: JSON.parse(q.options)
    }));
    
    res.json(formattedQuestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao carregar perguntas' });
  }
});

app.post('/player', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'O nome do herói é obrigatório' });
    }

    // Busca ou cria o jogador
    let player = await prisma.player.findUnique({
      where: { name },
      include: { badges: true }
    });

    if (!player) {
      player = await prisma.player.create({
        data: {
          name,
          totalScore: 0,
          levelsCompleted: '[]'
        },
        include: { badges: true }
      });
    }

    // Formata o levelsCompleted de string para array para o front-end
    const formattedPlayer = {
      ...player,
      levelsCompleted: JSON.parse(player.levelsCompleted)
    };

    res.status(201).json(formattedPlayer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar jogador' });
  }
});

app.post('/score', async (req, res) => {
  try {
    const { id, level, score, totalQuestions, badge } = req.body;
    
    const player = await prisma.player.findUnique({
      where: { id },
      include: { badges: true }
    });

    if (!player) {
      return res.status(404).json({ error: 'Jogador não encontrado' });
    }

    const percentage = (score / totalQuestions) * 100;
    const levelsCompleted = JSON.parse(player.levelsCompleted);
    
    // Atualizar dados
    let newScore = player.totalScore + score;
    let newLevels = [...levelsCompleted];
    
    if (percentage >= 70 && !newLevels.includes(level)) {
      newLevels.push(level);
      
      // Se tiver insígnia, cria no banco
      if (badge) {
        await prisma.badge.create({
          data: {
            name: badge,
            level,
            playerId: id
          }
        });
      }
    }

    const updatedPlayer = await prisma.player.update({
      where: { id },
      data: {
        totalScore: newScore,
        levelsCompleted: JSON.stringify(newLevels)
      },
      include: { badges: true }
    });

    res.json({
      ...updatedPlayer,
      levelsCompleted: JSON.parse(updatedPlayer.levelsCompleted)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar pontuação' });
  }
});

app.get('/ranking', async (req, res) => {
  try {
    const players = await prisma.player.findMany({
      orderBy: { totalScore: 'desc' },
      take: 10,
      include: { badges: true }
    });

    const formattedRanking = players.map(p => ({
      ...p,
      levelsCompleted: JSON.parse(p.levelsCompleted)
    }));

    res.json(formattedRanking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao carregar ranking' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor gameKis com Prisma rodando em http://localhost:${PORT}`);
});
