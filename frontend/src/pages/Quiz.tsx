import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../services/GameContext';
import { getQuestions } from '../services/api';
import { CheckCircle, XCircle, ChevronRight, HelpCircle, Shield } from 'lucide-react';
import BlackHoleBackground from '../components/BlackHoleBackground';

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  category: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const { player, currentLevel } = useGame();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const levelNames = [
    "Dev Iniciante",
    "Dev Intermediário",
    "Dev Master Front-End"
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestions(currentLevel);
        setQuestions(data);
      } catch (err) {
        console.error('Erro ao buscar perguntas', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [currentLevel]);

  const handleAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === questions[currentIndex].answer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Fim do nível
      navigate('/result', { 
        state: { 
          score, 
          total: questions.length, 
          level: currentLevel,
          levelName: levelNames[currentLevel - 1]
        } 
      });
    }
  };

  if (loading) return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
      <h2>CARREGANDO MISSÃO...</h2>
    </div>
  );

  if (questions.length === 0) return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
      <h2>NENHUMA MISSÃO ENCONTRADA</h2>
      <p style={{ color: 'white' }}>Verifique se o backend está rodando e contém perguntas para este nível.</p>
      <button onClick={() => navigate('/login')} className="hero-btn" style={{ marginTop: '20px' }}>VOLTAR</button>
    </div>
  );

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative'
    }}>
      <BlackHoleBackground level={currentLevel} />
      <header style={{ 
        width: '100%', 
        maxWidth: '800px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '20px 0',
        marginBottom: '2rem',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Shield size={32} color="var(--primary)" />
          <div>
            <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase' }}>FASE {currentLevel}</h4>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>{levelNames[currentLevel - 1]}</h3>
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'var(--accent)' }}>JOGADOR</h4>
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'white' }}>{player?.name}</h3>
        </div>
      </header>

      <div className="progress-container" style={{ width: '100%', maxWidth: '800px', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <div className="progress-fill" style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(to right, var(--secondary), var(--primary))', borderRadius: '5px', transition: 'width 0.3s ease', boxShadow: '0 0 10px var(--primary)' }}></div>
        <div style={{ position: 'absolute', right: '0', top: '-25px', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 'bold' }}>
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <div className="card" style={{ width: '100%', maxWidth: '800px', position: 'relative', overflow: 'visible', zIndex: 1 }}>
        <div style={{ 
          position: 'absolute', 
          top: '-25px', 
          left: '30px', 
          background: 'var(--primary)', 
          padding: '10px 20px', 
          borderRadius: '5px',
          fontWeight: 'bold',
          transform: 'skewX(-15deg)',
          boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
        }}>
          {currentQuestion.category}
        </div>

        <h2 style={{ fontSize: '1.5rem', marginTop: '1rem', lineHeight: '1.4', color: 'white' }}>
          {currentQuestion.question}
        </h2>

        <div className="options" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          {currentQuestion.options.map((option, idx) => {
            let statusClass = '';
            if (isAnswered) {
              if (option === currentQuestion.answer) statusClass = 'correct';
              else if (option === selectedOption) statusClass = 'wrong';
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className={`option-btn ${statusClass}`}
                style={{
                  padding: '15px 20px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  color: 'white',
                  textAlign: 'left',
                  fontSize: '1rem',
                  cursor: isAnswered ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  outline: 'none'
                }}
              >
                <span>{option}</span>
                {statusClass === 'correct' && <CheckCircle size={20} color="#4CAF50" />}
                {statusClass === 'wrong' && <XCircle size={20} color="var(--primary)" />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="explanation" style={{ 
            marginTop: '2rem', 
            padding: '20px', 
            background: 'rgba(0, 210, 255, 0.05)', 
            borderLeft: '4px solid var(--accent)',
            borderRadius: '4px',
            animation: 'fadeIn 0.5s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent)', marginBottom: '10px', fontWeight: 'bold' }}>
              <HelpCircle size={18} />
              <span>EXPLICAÇÃO</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: '1.5' }}>
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {isAnswered && (
          <button 
            className="hero-btn" 
            onClick={nextQuestion}
            style={{ 
              marginTop: '2rem', 
              alignSelf: 'flex-end', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              padding: '12px 30px'
            }}
          >
            {currentIndex + 1 === questions.length ? 'VER RESULTADO' : 'PRÓXIMA PERGUNTA'}
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      <style>{`
        .option-btn:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: var(--accent) !important;
          transform: translateY(-2px);
        }
        .option-btn.correct {
          background: rgba(76, 175, 80, 0.1) !important;
          border-color: #4CAF50 !important;
          box-shadow: 0 0 15px rgba(76, 175, 80, 0.2);
        }
        .option-btn.wrong {
          background: rgba(230, 36, 41, 0.1) !important;
          border-color: var(--primary) !important;
          box-shadow: 0 0 15px rgba(230, 36, 41, 0.2);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Quiz;
