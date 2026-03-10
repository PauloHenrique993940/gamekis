import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../services/GameContext';
import { getQuestions } from '../services/api';
import { CheckCircle, XCircle, ChevronRight, HelpCircle, Shield, Cpu } from 'lucide-react';
import BlackHoleBackground from '../components/BlackHoleBackground';

interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  category: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const { player, currentLevel } = useGame();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedIndex(idx);
    setIsAnswered(true);
    if (idx === questions[currentIndex].answer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(c => c + 1);
      setSelectedIndex(null);
      setIsAnswered(false);
    } else {
      navigate('/result', { 
        state: { score, total: questions.length, level: currentLevel, levelName: levelNames[currentLevel - 1] } 
      });
    }
  };

  if (loading) return (
    <div className="flex-center" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loader" style={{ textAlign: 'center' }}>
        <Cpu size={50} className="flicker" color="var(--primary)" />
        <h2 className="neon-text" style={{ marginTop: '20px' }}>CARREGANDO MISSÃO...</h2>
      </div>
    </div>
  );

  if (questions.length === 0) return (
    <div className="flex-center" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 className="neon-text">NENHUMA MISSÃO ENCONTRADA</h2>
      <p style={{ margin: '20px 0' }}>Verifique se o backend está rodando corretamente.</p>
      <button onClick={() => navigate('/')} className="hero-btn">VOLTAR AO INÍCIO</button>
    </div>
  );

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container" style={{ minHeight: '100vh', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <BlackHoleBackground level={currentLevel} />
      
      <header className="quiz-header" style={{ width: '100%', maxWidth: '900px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 0', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="icon-badge" style={{ padding: '10px', background: 'rgba(0,210,255,0.1)', border: '1px solid var(--primary)', borderRadius: '8px' }}>
            <Shield size={30} color="var(--primary)" />
          </div>
          <div>
            <h4 style={{ color: 'var(--primary)', fontSize: '0.7rem', letterSpacing: '2px', fontWeight: 'bold' }}>SISTEMA ATIVO - FASE {currentLevel}</h4>
            <h3 className="neon-text" style={{ fontSize: '1.4rem' }}>{levelNames[currentLevel - 1]}</h3>
          </div>
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', letterSpacing: '1px' }}>PLAYER STATUS</h4>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{player?.name}</h3>
        </div>
      </header>

      <div className="progress-wrapper" style={{ width: '100%', maxWidth: '900px', marginBottom: '40px', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          <span>PROGRESSO DA MISSÃO</span>
          <span>{currentIndex + 1} / {questions.length}</span>
        </div>
        <div className="progress-bar" style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 15px var(--primary)', transition: 'width 0.4s ease' }}></div>
        </div>
      </div>

      <div className="card" style={{ width: '100%', maxWidth: '900px', zIndex: 1 }}>
        <div className="category-tag" style={{ position: 'absolute', top: '0', right: '40px', background: 'var(--primary)', color: '#000', padding: '5px 20px', fontWeight: '900', fontSize: '0.7rem', letterSpacing: '2px', borderRadius: '0 0 8px 8px' }}>
          {currentQuestion.category.toUpperCase()}
        </div>

        <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', lineHeight: '1.4', fontWeight: '800' }}>
          <span style={{ color: 'var(--primary)', marginRight: '15px' }}>&gt;</span>
          {currentQuestion.question}
        </h2>

        <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {currentQuestion.options.map((option, idx) => {
            let status = '';
            if (isAnswered) {
              if (idx === currentQuestion.answer) status = 'correct';
              else if (idx === selectedIndex) status = 'wrong';
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`option-card ${status}`}
                disabled={isAnswered}
                style={{
                  padding: '20px',
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
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <span style={{ zIndex: 1 }}>{option}</span>
                {status === 'correct' && <CheckCircle size={20} color="#00ff88" style={{ zIndex: 1 }} />}
                {status === 'wrong' && <XCircle size={20} color="#ff4444" style={{ zIndex: 1 }} />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="explanation-box" style={{ marginTop: '30px', padding: '25px', background: 'rgba(0, 210, 255, 0.05)', borderLeft: '4px solid var(--primary)', borderRadius: '4px', animation: 'slideUp 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', marginBottom: '10px', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '1px' }}>
              <HelpCircle size={18} />
              <span>DADOS TÉCNICOS:</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: '1.6' }}>
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {isAnswered && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
            <button className="hero-btn" onClick={nextQuestion}>
              {currentIndex + 1 === questions.length ? 'FINALIZAR MISSÃO' : 'PRÓXIMO NÍVEL'}
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .option-card:not(:disabled):hover {
          background: rgba(0, 210, 255, 0.1) !important;
          border-color: var(--primary) !important;
          transform: translateX(10px);
          box-shadow: -5px 0 15px rgba(0, 210, 255, 0.2);
        }
        .option-card.correct {
          background: rgba(0, 255, 136, 0.1) !important;
          border-color: #00ff88 !important;
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
        }
        .option-card.wrong {
          background: rgba(255, 68, 68, 0.1) !important;
          border-color: #ff4444 !important;
          box-shadow: 0 0 20px rgba(255, 68, 68, 0.2);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .flicker { animation: flicker 2s infinite; }
      `}</style>
    </div>
  );
};

export default Quiz;
