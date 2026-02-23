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
  const [player, setPlayerState] = useState<Player | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(1);

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    const savedPlayer = localStorage.getItem('gamekis_player');
    const savedLevel = localStorage.getItem('gamekis_level');
    
    if (savedPlayer) {
      const p = JSON.parse(savedPlayer);
      setPlayerState(p);
      
      // Se já completou níveis, define o nível atual como o próximo disponível
      if (savedLevel) {
        setCurrentLevel(parseInt(savedLevel));
      } else if (p.levelsCompleted && p.levelsCompleted.length > 0) {
        const nextLevel = Math.max(...p.levelsCompleted) + 1;
        setCurrentLevel(nextLevel > 3 ? 3 : nextLevel);
      }
    }
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

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
