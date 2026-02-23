import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGame } from '../services/GameContext';
import { saveScore } from '../services/api';
import confetti from 'canvas-confetti';
import { Shield, ArrowRight } from 'lucide-react';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { player, setPlayer, setCurrentLevel } = useGame();
  const { score, total, level, levelName } = location.state || { score: 0, total: 10, level: 1, levelName: 'Dev' };

  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  const badges = [
    "RETRATO DO HERÓI",
    "ESPINHA DORSAL WEB",
    "GUARDIÃO DO FRONT-END"
  ];

  const badgeName = badges[level - 1];

  useEffect(() => {
    if (passed) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e62429', '#002d62', '#00d2ff', '#ffffff']
      });

      const updateScore = async () => {
        if (player) {
          try {
            const updatedPlayer = await saveScore(player.id, level, score, total, badgeName);
            setPlayer(updatedPlayer);
          } catch (err) {
            console.error('Erro ao salvar score', err);
          }
        }
      };
      updateScore();
    }
  }, [passed, player, level, score, total, badgeName, setPlayer]);

  const handleNext = () => {
    if (level < 3) {
      setCurrentLevel(level + 1);
      navigate('/quiz');
    } else {
      navigate('/ranking');
    }
  };

  const getBadgeImage = (lvl: number) => {
    if (lvl === 1) return '/src/assets/insignias/insignia1.png';
    if (lvl === 2) return '/src/assets/insignias/insiginia2.png';
    return '/src/assets/insignias/insignia1.png'; // Fallback
  };

  const downloadInsignia = () => {
    const link = document.createElement('a');
    link.href = getBadgeImage(level);
    link.download = `insignia-gamekis-level-${level}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareOnLinkedIn = () => {
    const text = `🚀 Missão Cumprida! Acabo de conquistar a insígnia "${badgeName}" no gameKis, a plataforma para heróis do Front-End. 🕷️🕸️

📊 Meu desempenho no nível ${levelName}:
✅ Pontuação: ${score} de ${total}
🎯 Foco em: HTML, CSS, JavaScript e React

Eu já aceitei o desafio e provei meu valor. E você, está pronto para mostrar que é um verdadeiro #DevHeroi? 

#FrontEnd #WebDevelopment #ReactJS #JavaScript #CodingChallenge #gameKis #Programming`;
    
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="card" style={{ 
        width: '100%', 
        maxWidth: '600px', 
        textAlign: 'center',
        border: passed ? '2px solid var(--accent)' : '2px solid var(--primary)',
        boxShadow: passed ? '0 0 30px rgba(0, 210, 255, 0.2)' : '0 0 30px rgba(230, 36, 41, 0.2)'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          {passed ? (
            <div className="badge-container" style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ 
                width: '180px', 
                height: '180px', 
                background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.5,
                animation: 'pulse 2s infinite'
              }}></div>
              <div style={{
                width: '160px',
                height: '160px',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid var(--accent)',
                boxShadow: '0 0 20px var(--accent)',
                position: 'relative',
                zIndex: 2,
                margin: '0 auto',
                overflow: 'hidden'
              }}>
                <img 
                  src={getBadgeImage(level)} 
                  alt={badgeName} 
                  style={{ width: '80%', height: '80%', objectFit: 'contain' }} 
                />
              </div>
            </div>
          ) : (
            <div style={{
              width: '120px',
              height: '120px',
              background: 'rgba(230, 36, 41, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '4px solid var(--primary)',
              margin: '0 auto'
            }}>
              <Shield size={60} color="var(--primary)" />
            </div>
          )}
        </div>

        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white' }}>
          {passed ? 'MISSÃO CUMPRIDA!' : 'TENTE NOVAMENTE'}
        </h1>
        <p style={{ color: 'var(--accent)', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          {levelName.toUpperCase()}
        </p>

        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          padding: '20px', 
          borderRadius: '12px',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>PONTUAÇÃO</h4>
            <h2 style={{ margin: 0, fontSize: '2rem', color: 'white' }}>{score} / {total}</h2>
          </div>
          <div style={{ width: '2px', height: '40px', background: 'rgba(255,255,255,0.1)' }}></div>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>DESEMPENHO</h4>
            <h2 style={{ margin: 0, fontSize: '2rem', color: passed ? 'var(--accent)' : 'var(--primary)' }}>{percentage}%</h2>
          </div>
        </div>

        {passed ? (
          <div style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ color: 'white', marginBottom: '10px' }}>VOCÊ CONQUISTOU A INSÍGNIA:</h3>
            <div style={{ 
              display: 'inline-block', 
              padding: '10px 25px', 
              background: 'linear-gradient(90deg, var(--secondary), var(--primary))',
              borderRadius: '50px',
              fontWeight: '900',
              fontSize: '1.1rem',
              letterSpacing: '2px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              textTransform: 'uppercase'
            }}>
              {badgeName}
            </div>
          </div>
        ) : (
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Você precisa de pelo menos 70% de acerto para desbloquear a próxima fase e ganhar sua insígnia de herói.
          </p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {passed ? (
            <>
              <button className="hero-btn" onClick={handleNext} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                {level < 3 ? 'PRÓXIMA FASE' : 'VER RANKING'}
                <ArrowRight size={20} />
              </button>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button 
                  onClick={downloadInsignia}
                  style={{ 
                    background: 'var(--secondary)', 
                    color: 'white', 
                    border: 'none',
                    padding: '12px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s'
                  }}
                >
                  BAIXAR INSÍGNIA
                </button>
                <button 
                  onClick={shareOnLinkedIn}
                  style={{ 
                    background: 'transparent', 
                    color: 'var(--accent)', 
                    border: '1px solid var(--accent)',
                    padding: '12px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s'
                  }}
                >
                  LINKEDIN
                </button>
              </div>
            </>
          ) : (
            <button className="hero-btn" onClick={() => navigate('/quiz')} style={{ width: '100%' }}>
              RECOMECAR MISSÃO
            </button>
          )}
          
          <button 
            onClick={() => navigate('/ranking')}
            style={{ 
              background: 'transparent', 
              color: 'rgba(255,255,255,0.5)', 
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.9rem',
              marginTop: '10px'
            }}
          >
            VER RANKING GLOBAL
          </button>
        </div>
      </div>

      <style>{`
        .badge-container {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Result;
