import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRanking } from '../services/api';
import { Trophy, ArrowLeft, Award, User, Star, Terminal } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  totalScore: number;
  badges: Array<{
    name: string;
    level: number;
    date: string;
  }>;
}

const Ranking = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getRanking();
        setPlayers(data);
      } catch (err) {
        console.error('Erro ao buscar ranking', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <header style={{ 
        width: '100%', 
        maxWidth: '800px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '3rem'
      }}>
        <button 
          onClick={() => navigate('/')}
          className="hero-btn"
          style={{ padding: '10px 20px', fontSize: '0.8rem' }}
        >
          <ArrowLeft size={16} />
          VOLTAR
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Trophy size={40} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 10px var(--primary))' }} />
          <h2 className="neon-text" style={{ fontSize: '2rem' }}>HALL DA FAMA</h2>
        </div>
      </header>

      <div className="card" style={{ width: '100%', maxWidth: '800px', padding: '0' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid rgba(0, 210, 255, 0.2)', background: 'rgba(0, 210, 255, 0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Terminal size={18} color="var(--primary)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', color: 'var(--primary)' }}>SISTEMA DE CLASSIFICAÇÃO ATIVO</span>
        </div>

        {loading ? (
          <div style={{ padding: '50px', textAlign: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>SINCRONIZANDO DADOS...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {players.length > 0 ? (
              players.map((p, idx) => (
                <div 
                  key={p.id} 
                  className="ranking-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '70px 1fr 120px 80px',
                    alignItems: 'center',
                    padding: '25px',
                    borderBottom: idx === players.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                    background: idx === 0 ? 'rgba(0, 210, 255, 0.08)' : 'transparent',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ 
                    fontWeight: '900', 
                    fontSize: '1.5rem', 
                    color: idx === 0 ? '#FFD700' : idx === 1 ? '#C0C0C0' : idx === 2 ? '#CD7F32' : 'rgba(255,255,255,0.2)',
                    fontFamily: 'monospace'
                  }}>
                    #{idx + 1}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ 
                      width: '45px', 
                      height: '45px', 
                      background: 'rgba(255,255,255,0.03)', 
                      border: `1px solid ${idx === 0 ? '#FFD700' : 'rgba(255,255,255,0.1)'}`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <User size={22} color={idx === 0 ? '#FFD700' : 'white'} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: 'white', fontSize: '1.1rem' }}>{p.name}</h4>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '5px' }}>
                        {p.badges.map((_, bIdx) => (
                          <Award key={bIdx} size={14} color="var(--primary)" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>EXP POINTS</h4>
                    <span style={{ fontWeight: '900', fontSize: '1.4rem', color: 'var(--primary)', fontFamily: 'monospace' }}>{p.totalScore}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {idx === 0 && <Star size={28} color="#FFD700" fill="#FFD700" style={{ filter: 'drop-shadow(0 0 10px #FFD700)' }} />}
                    {idx === 1 && <Star size={24} color="#C0C0C0" fill="#C0C0C0" />}
                    {idx === 2 && <Star size={24} color="#CD7F32" fill="#CD7F32" />}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '60px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', letterSpacing: '2px' }}>NENHUM HERÓI CATALOGADO AINDA.</div>
            )}
          </div>
        )}
      </div>

      <button 
        className="hero-btn" 
        onClick={() => navigate('/')}
        style={{ marginTop: '4rem', width: '320px' }}
      >
        ACEITAR DESAFIO
      </button>

      <style>{`
        .ranking-row:hover {
          background: rgba(255,255,255,0.03) !important;
          transform: scale(1.01);
          border-left: 4px solid var(--primary);
        }
      `}</style>
    </div>
  );
};

export default Ranking;
