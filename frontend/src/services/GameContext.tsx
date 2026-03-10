import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface Player {
  id: string;
  name: string;
  totalScore: number;
  levelsCompleted: number[];
  badges: Array<{
    name: string;
    level: number;
    date: string;
  }>;
}

interface GameContextType {
  player: Player | null;
  setPlayer: (player: Player | null) => void;
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [player, setPlayerState] = useState<Player | null>(() => {
    const savedPlayer = localStorage.getItem('gamekis_player');
    if (savedPlayer) return JSON.parse(savedPlayer);
    
    // Criar jogador anônimo por padrão se não houver um
    const anonymousPlayer: Player = {
      id: 'anon-' + Math.random().toString(36).substr(2, 9),
      name: 'Herói Anônimo',
      totalScore: 0,
      levelsCompleted: [],
      badges: []
    };
    return anonymousPlayer;
  });
  
  const [currentLevel, setCurrentLevel] = useState<number>(() => {
    const savedLevel = localStorage.getItem('gamekis_level');
    if (savedLevel) return parseInt(savedLevel);
    
    const savedPlayer = localStorage.getItem('gamekis_player');
    if (savedPlayer) {
      const p = JSON.parse(savedPlayer);
      if (p.levelsCompleted && p.levelsCompleted.length > 0) {
        const nextLevel = Math.max(...p.levelsCompleted) + 1;
        return nextLevel > 3 ? 3 : nextLevel;
      }
    }
    return 1;
  });

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    // A inicialização agora é feita diretamente no useState
  }, []);

  const setPlayer = (p: Player | null) => {
    setPlayerState(p);
    if (p) {
      localStorage.setItem('gamekis_player', JSON.stringify(p));
    } else {
      localStorage.removeItem('gamekis_player');
      localStorage.removeItem('gamekis_level');
    }
  };

  const updateLevel = (level: number) => {
    setCurrentLevel(level);
    localStorage.setItem('gamekis_level', level.toString());
  };

  const logout = () => {
    setPlayer(null);
  };

  return (
    <GameContext.Provider value={{ 
      player, 
      setPlayer, 
      currentLevel, 
      setCurrentLevel: updateLevel,
      isLoggedIn: !!player,
      logout
    }}>
      {children}
    </GameContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
