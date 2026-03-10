import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Cpu } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/quiz');
    }, 4500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle, #0a0a15 0%, #000 100%)',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Efeito de grade de fundo (estilo Retrowave/Gamer) */}
      <div style={{
        position: 'absolute',
        width: '200%',
        height: '200%',
        backgroundImage: 'linear-gradient(rgba(0, 210, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 210, 255, 0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        transform: 'perspective(500px) rotateX(60deg)',
        bottom: '-50%',
        zIndex: 0,
        animation: 'gridMove 10s linear infinite'
      }}></div>

      <div className={`splash-content ${show ? 'visible' : ''}`} style={{
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: 1,
        position: 'relative'
      }}>
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <Shield size={140} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 30px var(--primary))' }} />
          <Zap size={70} color="var(--accent)" style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 0 15px var(--accent))',
            animation: 'flicker 2s infinite'
          }} />
        </div>
        
        <h1 style={{ 
          fontSize: '5rem', 
          fontWeight: '950', 
          letterSpacing: '8px',
          margin: '10px 0',
          background: 'linear-gradient(to bottom, #fff 30%, var(--primary) 70%, #0044ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 10px rgba(0, 210, 255, 0.8))',
          textTransform: 'uppercase',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          GAMEKIS
        </h1>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '15px',
          marginTop: '10px'
        }}>
          <div className="gamer-tag" style={{
            background: 'rgba(0, 210, 255, 0.15)',
            border: '2px solid var(--accent)',
            padding: '8px 25px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 0 20px rgba(0, 210, 255, 0.3)',
            animation: 'glowPulse 1.5s infinite alternate'
          }}>
            <Cpu size={24} color="var(--accent)" />
            <span style={{
              color: 'white',
              fontSize: '1.4rem',
              fontWeight: '900',
              letterSpacing: '4px',
              textShadow: '0 0 10px var(--accent)',
              fontFamily: '"Courier New", Courier, monospace'
            }}>
              FRONT-END MODE GAME
            </span>
          </div>
          
          <div className="blink-text" style={{ 
            color: 'rgba(255,255,255,0.4)', 
            fontSize: '0.8rem', 
            fontWeight: 'bold', 
            letterSpacing: '3px',
            marginTop: '10px'
          }}>
            CARREGANDO SISTEMAS...
          </div>
        </div>

        <div className="progress-bar-container" style={{
          width: '400px',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          marginTop: '3.5rem',
          overflow: 'hidden',
          border: '1px solid rgba(0, 210, 255, 0.2)'
        }}>
          <div className="progress-bar-fill" style={{
            height: '100%',
            background: 'linear-gradient(90deg, transparent, var(--accent), #fff)',
            boxShadow: '0 0 15px var(--accent)',
            width: show ? '100%' : '0%',
            transition: 'width 3.5s linear'
          }}></div>
        </div>
      </div>
      
      <style>{`
        @keyframes gridMove {
          from { background-position: 0 0; }
          to { background-position: 0 40px; }
        }
        @keyframes glowPulse {
          from { box-shadow: 0 0 10px rgba(0, 210, 255, 0.2); border-color: rgba(0, 210, 255, 0.5); }
          to { box-shadow: 0 0 25px rgba(0, 210, 255, 0.6); border-color: #00d2ff; }
        }
        @keyframes flicker {
          0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; }
          20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.4; }
        }
        .blink-text {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .splash-content { transition: all 1s ease; }
        .visible { opacity: 1; transform: scale(1); }
      `}</style>
    </div>
  );
};

export default Splash;
