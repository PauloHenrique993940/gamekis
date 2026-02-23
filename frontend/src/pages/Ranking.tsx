import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRanking } from '../services/api';
import { Trophy, ArrowLeft, Shield, Award, User, Star } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  totalScore: number;
  badges: any[];
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
      background: 'var(--darker)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <header style={{ 
        width: '100%', 
        maxWidth: '700px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '3rem'
      }}>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            background: 'transparent', 
            color: 'var(--accent)', 
            border: 'none', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          <ArrowLeft size={20} />
          VOLTAR
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Trophy size={40} color="var(--primary)" />
          <h2 style={{ fontSize: '2rem', letterSpacing: '2px', color: 'white' }}>HALL DA FAMA</h2>
        </div>
      </header>

      <div className="card" style={{ width: '100%', maxWidth: '700px', padding: '10px' }}>
        {loading ? (
          <div style={{ padding: '50px', textAlign: 'center', color: 'var(--accent)' }}>CARREGANDO HEROIS...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {players.length > 0 ? (
              players.map((p, idx) => (
                <div 
                  key={p.id} 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '50px 1fr 100px 100px',
                    alignItems: 'center',
                    padding: '20px',
                    borderBottom: idx === players.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                    background: idx === 0 ? 'rgba(0, 210, 255, 0.05)' : 'transparent',
                    borderRadius: idx === 0 ? '10px' : '0',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ 
                    fontWeight: '900', 
                    fontSize: '1.2rem', 
                    color: idx < 3 ? 'var(--primary)' : 'rgba(255,255,255,0.3)' 
                  }}>
                    {idx + 1}º
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: 'rgba(255,255,255,0.05)', 
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <User size={20} color={idx === 0 ? 'var(--accent)' : 'rgba(255,255,255,0.5)'} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, color: 'white' }}>{p.name}</h4>
                      <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                        {p.badges.map((_, bIdx) => (
                          <Award key={bIdx} size={14} color="var(--accent)" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>PONTOS</h4>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--white)' }}>{p.totalScore}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {idx === 0 && <Star size={24} color="#FFD700" fill="#FFD700" />}
                    {idx === 1 && <Star size={24} color="#C0C0C0" fill="#C0C0C0" />}
                    {idx === 2 && <Star size={24} color="#CD7F32" fill="#CD7F32" />}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: '50px', textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>Nenhum herói registrado ainda. Seja o primeiro!</div>
            )}
          </div>
        )}
      </div>

      <button 
        className="hero-btn" 
        onClick={() => navigate('/login')}
        style={{ marginTop: '3rem', width: '300px' }}
      >
        JOGAR AGORA
      </button>

      <style>{`
        .card > div > div:hover {
          background: rgba(255,255,255,0.03);
          transform: scale(1.02);
          z-index: 2;
        }
      `}</style>
    </div>
  );
};

export default Ranking;
