import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGame } from '../services/GameContext';
import { saveScore } from '../services/api';
import confetti from 'canvas-confetti';
import { Shield, ArrowRight, Download, Linkedin, Award, Trophy } from 'lucide-react';

// Importando a imagem do guerreiro da pasta assets para exibição
import guerreiro1 from '../assets/guerreiro1.png';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { player, setPlayer, setCurrentLevel } = useGame();
  
  const { score, total, level, levelName } = location.state || { score: 0, total: 10, level: 1, levelName: 'Iniciante' };

  const hasInsignia = score >= 7;
  const passed = (score / total) * 100 >= 70;

  const badges = [
    "RETRATO DO HERÓI",      // Nível 1
    "ESPINHA DORSAL WEB",    // Nível 2
    "GUARDIÃO DO FRONT-END"  // Nível 3
  ];

  const badgeName = badges[level - 1] || "HERÓI DO CÓDIGO";

  useEffect(() => {
    if (hasInsignia || passed) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00d2ff', '#0044ff', '#ffffff']
      });

      const updateScore = async () => {
        if (player) {
          try {
            const updatedPlayer = await saveScore(player.id, level, score, total, hasInsignia ? badgeName : undefined);
            setPlayer(updatedPlayer);
          } catch (err) {
            console.error('Erro ao salvar score', err);
          }
        }
      };
      updateScore();
    }
  }, [hasInsignia, passed, player, level, score, total, badgeName, setPlayer]);

  const handleNext = () => {
    if (level < 3) {
      setCurrentLevel(level + 1);
      navigate('/quiz');
    } else {
      navigate('/ranking');
    }
  };

  const getDisplayImage = (lvl: number) => {
    if (lvl === 1) return guerreiro1;
    if (lvl === 2) return '/insignias/insignia2.png';
    return '/insignias/insignia1.png'; 
  };

  const getDownloadPath = (lvl: number) => {
    if (lvl === 1) return '/insignias/insignia1.png';
    if (lvl === 2) return '/insignias/insignia2.png';
    return '/insignias/insignia1.png';
  };

  const downloadInsignia = async () => {
    const filePath = getDownloadPath(level);
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `gamekis-insignia-level${level}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const link = document.createElement('a');
      link.href = filePath;
      link.download = `gamekis-insignia-level${level}.png`;
      link.click();
    }
  };

  const shareOnLinkedIn = () => {
    const text = `🚀 CONQUISTA DESBLOQUEADA: ${badgeName}! 🛡️\n\nAcabo de completar a fase "${levelName}" no GameKis com ${score} pontos! \n\n💻 Tecnologias validadas: HTML, CSS, JavaScript e React.\n\n#GameKis #FrontEnd #WebDev #React #JavaScript #DevHeroi`;
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '650px', textAlign: 'center' }}>
        
        <div style={{ marginBottom: '30px' }}>
          {hasInsignia ? (
            <div className="badge-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                opacity: 0.3,
                animation: 'pulse 2s infinite'
              }}></div>
              <img 
                src={getDisplayImage(level)} 
                alt={badgeName}
                style={{
                  width: '160px',
                  height: '160px',
                  position: 'relative',
                  zIndex: 2,
                  filter: 'drop-shadow(0 0 15px var(--primary))',
                  animation: 'float 3s ease-in-out infinite',
                  borderRadius: '50%',
                  border: '4px solid var(--primary)',
                  objectFit: 'cover',
                  background: 'rgba(0,0,0,0.5)'
                }}
              />
            </div>
          ) : (
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'rgba(230, 36, 41, 0.1)',
              border: '4px solid #e62429',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 0 20px rgba(230, 36, 41, 0.3)'
            }}>
              <Shield size={60} color="#e62429" />
            </div>
          )}
        </div>

        <h1 className="neon-text" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          {hasInsignia ? 'MISSÃO CUMPRIDA!' : 'SISTEMA EM FALHA'}
        </h1>
        
        <div style={{ 
          display: 'inline-block',
          background: hasInsignia ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
          color: hasInsignia ? '#000' : 'white',
          padding: '6px 20px',
          borderRadius: '4px',
          fontWeight: '900',
          fontSize: '0.8rem',
          marginBottom: '30px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          border: hasInsignia ? 'none' : '1px solid rgba(255,255,255,0.1)'
        }}>
          {levelName}
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '20px',
          background: 'rgba(0,0,0,0.4)',
          padding: '25px',
          borderRadius: '10px',
          marginBottom: '35px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0 5px 0', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px' }}>DATA COLLECTED</p>
            <h2 style={{ color: 'white', margin: 0, fontFamily: 'monospace' }}>{score} / {total}</h2>
          </div>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.4)', margin: '0 0 5px 0', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '1px' }}>ACCURACY</p>
            <h2 style={{ color: hasInsignia ? 'var(--primary)' : 'white', margin: 0, fontFamily: 'monospace' }}>{Math.round((score/total)*100)}%</h2>
          </div>
        </div>

        {hasInsignia ? (
          <div style={{ marginBottom: '35px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--primary)', marginBottom: '15px' }}>
              <Award size={24} />
              <h3 style={{ margin: 0, letterSpacing: '1px' }}>INSÍGNIA DESBLOQUEADA:</h3>
            </div>
            <h2 style={{ color: 'white', fontWeight: '900', fontSize: '1.4rem', letterSpacing: '2px', marginBottom: '25px' }}>{badgeName}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <button 
                onClick={downloadInsignia}
                style={{ background: 'white', color: 'black', border: 'none', padding: '16px', borderRadius: '4px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.8rem', letterSpacing: '1px' }}
              >
                <Download size={18} /> BAIXAR PNG
              </button>
              <button 
                onClick={shareOnLinkedIn}
                style={{ background: '#0077b5', color: 'white', border: 'none', padding: '16px', borderRadius: '4px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.8rem', letterSpacing: '1px' }}
              >
                <Linkedin size={18} /> LINKEDIN
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: '35px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              Herói, seus dados de combate foram insuficientes. Você precisa de pelo menos <strong>7 acertos</strong> para validar esta missão.
            </p>
          </div>
        )}

        <button 
          className="hero-btn"
          onClick={passed ? handleNext : () => navigate('/quiz')}
          style={{ width: '100%', padding: '20px' }}
        >
          {passed ? (level < 3 ? 'INICIAR PRÓXIMA FASE' : 'FINALIZAR JORNADA') : 'REINICIAR PROTOCOLO'}
          <ArrowRight size={22} />
        </button>

      </div>
    </div>
  );
};

export default Result;
