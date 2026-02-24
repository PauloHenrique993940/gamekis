import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../services/GameContext';
import { registerPlayer } from '../services/api';
import { User, Shield, Terminal, CheckCircle2 } from 'lucide-react';
import '../styles/LoginPage.css';

const Login = () => {
  const navigate = useNavigate();
  const { player, setPlayer, currentLevel } = useGame();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Preenche o nome salvo do localStorage ao iniciar
  useEffect(() => {
    const savedName = localStorage.getItem('gamekis_player_name');
    if (savedName) setName(savedName);
    if (player) setName(player.name);
  }, [player]);

  // Salva o nome digitado no localStorage em tempo real
  useEffect(() => {
    if (name) localStorage.setItem('gamekis_player_name', name);
  }, [name]);

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
      // Limpa o nome salvo após login bem-sucedido
      localStorage.removeItem('gamekis_player_name');
      navigate('/quiz');
    } catch (err: any) {
      console.error('Erro detalhado no login:', err);
      const msg = err.response?.data?.error || 'Erro ao conectar ao servidor (verifique se o backend está rodando na porta 3001).';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-header">
          <div className="login-header-icon">
            <Shield size={32} color="white" />
          </div>
          <h1 className="login-title">BEM-VINDO AO GAMEKIS</h1>
          <p className="login-subtitle">Sua jornada Front-End começa aqui!</p>
        </div>

        <div className="login-howto">
          <h3 className="login-howto-title">
            <Terminal size={20} color="var(--accent)" />
            COMO FUNCIONA O JOGO:
          </h3>
          <ul className="login-howto-list">
            <li>
              <CheckCircle2 size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
              <span>Enfrente <strong>3 Fases</strong> épicas (Iniciante, Intermediário e Master).</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
              <span>Acerte pelo menos <strong>70% das perguntas</strong> para avançar e ganhar sua insígnia.</span>
            </li>
            <li>
              <CheckCircle2 size={18} color="var(--accent)" style={{ flexShrink: 0 }} />
              <span>Seu progresso é <strong>salvo automaticamente</strong>. Pode fechar e voltar quando quiser!</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleStart}>
          <div className="login-input-group">
            <label className="login-label">QUAL É O SEU NOME DE HERÓI?</label>
            <div className="login-input-wrapper">
              <input
                type="text"
                placeholder="Ex: Peter Parker"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="login-input"
              />
              <User size={22} className="login-input-icon" />
            </div>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button 
            type="submit" 
            className="hero-btn login-btn-main" 
            disabled={loading}
          >
            {loading ? 'CONECTANDO...' : player ? 'CONTINUAR JORNADA' : 'ENTENDI, VAMOS JOGAR!'}
          </button>
        </form>

        {player && (
          <div className="login-progress">
            Você parou na <strong>Fase {currentLevel}</strong>. Clique acima para retomar.
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
