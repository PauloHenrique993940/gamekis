import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../services/GameContext';
import { registerPlayer, getStatus } from '../services/api';
import { User, Shield, Terminal, CheckCircle2, AlertTriangle, Wifi, WifiOff } from 'lucide-react';
import '../styles/LoginPage.css';

const Login = () => {
  const navigate = useNavigate();
  const { player, setPlayer, currentLevel } = useGame();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [dbInfo, setDbInfo] = useState({ questions: 0 });

  // Verifica status do servidor ao carregar
  useEffect(() => {
    const checkServer = async () => {
      try {
        const data = await getStatus();
        setServerStatus('online');
        setDbInfo({ questions: data.questions });
        if (data.questions === 0) {
          setError('O banco de dados está vazio. Por favor, rode o seed.');
        }
      } catch (err) {
        setServerStatus('offline');
        setError('Servidor Offline. Verifique se o backend está rodando na porta 3001.');
      }
    };
    checkServer();
  }, []);

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

    if (serverStatus === 'offline') {
      setError('Não é possível iniciar: Servidor Offline.');
      return;
    }

    if (dbInfo.questions === 0) {
      setError('Não é possível iniciar: Não há perguntas no banco.');
      return;
    }

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
    } catch (err) {
      console.error('Erro detalhado no login:', err);
      const error = err as { response?: { data?: { error?: string } } };
      const msg = error.response?.data?.error || 'Erro ao conectar ao servidor.';
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
          
          <div className={`server-badge ${serverStatus}`}>
            {serverStatus === 'online' ? <Wifi size={14} /> : <WifiOff size={14} />}
            {serverStatus === 'checking' ? 'VERIFICANDO SERVIDOR...' : 
             serverStatus === 'online' ? 'SISTEMAS ONLINE' : 'SERVIDOR OFFLINE'}
          </div>
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
              <span>Seu progresso é <strong>salvo automaticamente</strong>.</span>
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
                disabled={serverStatus === 'offline'}
              />
              <User size={22} className="login-input-icon" />
            </div>
          </div>

          {error && (
            <div className="login-error" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 70, 70, 0.1)', border: '1px solid rgba(255, 70, 70, 0.2)', color: '#ff4646', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>
              <AlertTriangle size={18} />
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="hero-btn login-btn-main" 
            disabled={loading || serverStatus === 'offline'}
          >
            {loading ? 'CONECTANDO...' : player ? 'CONTINUAR JORNADA' : 'ENTENDI, VAMOS JOGAR!'}
          </button>
        </form>

        {player && serverStatus === 'online' && (
          <div className="login-progress">
            Você parou na <strong>Fase {currentLevel}</strong>. Clique acima para retomar.
          </div>
        )}
      </div>
      
      <style>{`
        .server-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: bold;
          margin-top: 10px;
          letter-spacing: 1px;
        }
        .server-badge.online {
          background: rgba(0, 255, 136, 0.1);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 136, 0.2);
        }
        .server-badge.offline {
          background: rgba(255, 70, 70, 0.1);
          color: #ff4646;
          border: 1px solid rgba(255, 70, 70, 0.2);
        }
        .server-badge.checking {
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Login;
