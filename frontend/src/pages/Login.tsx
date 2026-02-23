import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../services/GameContext';
import { registerPlayer } from '../services/api';
import { User, Shield, Zap, Terminal, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { player, setPlayer, currentLevel } = useGame();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Se já existir um jogador salvo, preenche o nome automaticamente
  useEffect(() => {
    if (player) {
      setName(player.name);
    }
  }, [player]);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Diga-nos seu nome de herói!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const playerData = await registerPlayer(name);
      setPlayer(playerData);
      navigate('/quiz');
    } catch (err: any) {
      setError('Erro ao iniciar missão. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'transparent'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '550px', position: 'relative', border: '1px solid var(--accent)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', padding: '15px', background: 'var(--primary)', borderRadius: '50%', marginBottom: '1rem', boxShadow: '0 0 20px var(--primary)' }}>
            <Shield size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '2.5rem', color: 'white', letterSpacing: '2px' }}>BEM-VINDO AO GAMEKIS</h1>
          <p style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Sua jornada Front-End começa aqui!</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px', marginBottom: '2rem' }}>
          <h3 style={{ color: 'white', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Terminal size={20} color="var(--accent)" />
            COMO FUNCIONA O JOGO:
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
              <CheckCircle2 size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
              <span>Enfrente <strong>3 Fases</strong> épicas (Iniciante, Intermediário e Master).</span>
            </li>
            <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
              <CheckCircle2 size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
              <span>Acerte pelo menos <strong>70% das perguntas</strong> para avançar e ganhar sua insígnia.</span>
            </li>
            <li style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
              <CheckCircle2 size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
              <span>Seu progresso é <strong>salvo automaticamente</strong>. Pode fechar e voltar quando quiser!</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleStart}>
          <div className="input-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 'bold' }}>QUAL É O SEU NOME DE HERÓI?</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Ex: Peter Parker"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px 15px 15px 45px',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '1.1rem',
                  outline: 'none'
                }}
              />
              <User size={22} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--accent)' }} />
            </div>
          </div>

          {error && <div style={{ color: 'var(--primary)', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' }}>{error}</div>}

          <button 
            type="submit" 
            className="hero-btn" 
            disabled={loading}
            style={{ width: '100%', height: '60px', fontSize: '1.3rem' }}
          >
            {loading ? 'CONECTANDO...' : player ? 'CONTINUAR JORNADA' : 'ENTENDI, VAMOS JOGAR!'}
          </button>
        </form>

        {player && (
          <div style={{ marginTop: '1rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
            Você parou na <strong>Fase {currentLevel}</strong>. Clique acima para retomar.
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
