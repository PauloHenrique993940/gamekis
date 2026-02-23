import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Terminal } from 'lucide-react';

const Splash = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 500);
    const timer = setTimeout(() => {
      navigate('/login');
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
      background: 'transparent',
      textAlign: 'center'
    }}>
      <div className={`splash-content ${show ? 'visible' : ''}`} style={{
        opacity: show ? 1 : 0,
        transform: show ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <Shield size={120} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 20px var(--primary))' }} />
          <Zap size={60} color="var(--accent)" style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 0 10px var(--accent))'
          }} />
        </div>
        
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: '900', 
          letterSpacing: '5px',
          margin: '10px 0',
          background: 'linear-gradient(to bottom, #fff 40%, var(--primary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5))'
        }}>
          GAMEKIS
        </h1>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '10px',
          color: 'var(--accent)',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          letterSpacing: '2px'
        }}>
          <Terminal size={20} />
          <span>FRONT-END HEROES</span>
        </div>

        <div className="progress-bar-container" style={{
          width: '300px',
          height: '6px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '3px',
          marginTop: '3rem',
          overflow: 'hidden'
        }}>
          <div className="progress-bar-fill" style={{
            height: '100%',
            background: 'var(--primary)',
            boxShadow: '0 0 10px var(--primary)',
            width: show ? '100%' : '0%',
            transition: 'width 3.5s linear'
          }}></div>
        </div>
      </div>
      
      <style>{`
        .splash-content { transition: all 1s ease; }
        .visible { opacity: 1; transform: scale(1); }
      `}</style>
    </div>
  );
};

export default Splash;
