'use client'
import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowLeftCircle, Play ,RotateCcw} from "lucide-react";

const GRID_SIZE = 20;

type Point = { x: number; y: number; };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const skillList = [
  { name: "React", icon: "react-javascript-js-framework-facebook-svgrepo-com.svg" },
  { name: "Next.js", icon: "nextjs-svgrepo-com.svg" },
  { name: "JavaScript", icon: "javascript-svgrepo-com.svg" },
  { name: "TypeScript", icon: "typescript-svgrepo-com.svg" },
  { name: "HTML", icon: "html-5-svgrepo-com.svg" },
  { name: "CSS", icon: "css-file-web-svgrepo-com.svg" },
  { name: "Node.js", icon: "nodejs-icon.svg" },
  { name: "Git", icon: "git-scm-icon.svg" },
  { name: "C++", icon: "isocpp-icon.svg" },
  { name: "Python", icon: "python-icon.svg" },
  { name: "Numpy", icon: "numpy-icon.svg" },
  { name: "Express", icon: "expressjs-icon.svg" },
  { name: "TensorFlow", icon: "tensorflow-icon.svg" },
  { name: "MongoDB", icon: "mongodb-icon.svg" },
  { name: "3js", icon: "3jsIcon.png" },
  { name: "Vscode", icon: "icons8-visual-studio-code.svg" }
];

export default function SkillComponent() {
  const [snake, setSnake] = useState<Point[]>([
    { y: 0, x: 2 }, { y: 0, x: 1 }, { y: 0, x: 0 }
  ]);
  const [food, setFood] = useState<Point>({ x: 0, y: 0 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showSkills, setShowSkills] = useState(true);
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [collectedSkills, setCollectedSkills] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    if (snake.some(segment => segment.x === x && segment.y === y)) {
      generateFood(); // retry
      return;
    }
    setFood({ x, y });
    setCurrentFoodIndex((prev) => (prev + 1) % skillList.length);
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP': head.y--; break;
      case 'DOWN': head.y++; break;
      case 'LEFT': head.x--; break;
      case 'RIGHT': head.x++; break;
    }

    if (
      head.x < 0 || head.x >= GRID_SIZE ||
      head.y < 0 || head.y >= GRID_SIZE ||
      newSnake.some(seg => seg.x === head.x && seg.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      const skill = skillList[currentFoodIndex].name;
      if (!collectedSkills.includes(skill)) {
        setCollectedSkills(prev => [...prev, skill]);
      }
      setScore(prev => prev + 1);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' && direction !== 'DOWN') setDirection('UP');
    else if (e.key === 'ArrowDown' && direction !== 'UP') setDirection('DOWN');
    else if (e.key === 'ArrowLeft' && direction !== 'RIGHT') setDirection('LEFT');
    else if (e.key === 'ArrowRight' && direction !== 'LEFT') setDirection('RIGHT');
    else if (e.key === 'Escape' && gameStarted) backToSkills();
  };

  const handleDirectionChange = (newDirection: Direction) => {
    if (newDirection === 'UP' && direction !== 'DOWN') setDirection('UP');
    else if (newDirection === 'DOWN' && direction !== 'UP') setDirection('DOWN');
    else if (newDirection === 'LEFT' && direction !== 'RIGHT') setDirection('LEFT');
    else if (newDirection === 'RIGHT' && direction !== 'LEFT') setDirection('RIGHT');
  };

  const startGame = () => {
    const center = Math.floor(GRID_SIZE / 2);
    setSnake([{ y: center, x: 2 }, { y: center, x: 1 }, { y: center, x: 0 }]);
    setDirection('RIGHT');
    setGameOver(false);
    setGameStarted(true);
    setShowSkills(false);
    setScore(0);
    setCollectedSkills([]);
    generateFood();
  };

  const resetGame = () => {
    const center = Math.floor(GRID_SIZE / 2);
    setSnake([{ y: center, x: 2 }, { y: center, x: 1 }, { y: center, x: 0 }]);
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    generateFood();
  };

  const backToSkills = () => {
    setGameStarted(false);
    setShowSkills(true);
  };

  const getCellContent = (x: number, y: number) => {
    if (snake[0].x === x && snake[0].y === y)
      return <div className="w-full h-full bg-blue-400 dark:bg-green-500 rounded-md shadow-md" />;
    if (snake.some((s, i) => i > 0 && s.x === x && s.y === y))
      return <div className="w-full h-full bg-blue-200 dark:bg-green-300 rounded" />;
    if (food.x === x && food.y === y)
      return (
        <div className="w-full h-full flex items-center justify-center bg-pink-100 dark:bg-yellow-300 rounded-full">
          <img src={`/${skillList[currentFoodIndex].icon}`} alt="skill" className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      );
    return null;
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const interval = setInterval(moveSnake, 120);
    return () => clearInterval(interval);
  }, [snake, direction, gameStarted, gameOver]);

  useEffect(() => { generateFood(); }, []);

  return (
    <div className="flex flex-col overflow-y-auto max-h-screen w-full items-center justify-start dark:text-white text-black px-4">
      <h1 className="text-3xl font-bold mb-2 text-purple-800 dark:text-purple-300">My Skills Showcase</h1>
      <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400 italic">
        Collect skills by playing the game 🎮
      </p>

      {showSkills && (
        <div className="w-full max-w-4xl px-4 relative">
          <h2 className="text-xl font-semibold mb-6 text-center text-purple-700 dark:text-purple-400">
            Skills Collection
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {skillList.map((skill, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center p-6 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-purple-900 dark:to-blue-900 rounded-xl shadow-md hover:scale-105 transition-transform hover:shadow-purple-400 dark:hover:shadow-purple-700"
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-800 p-3 rounded-full mb-3 shadow-sm flex items-center justify-center">
                  <img src={`/${skill.icon}`} alt={skill.name} className="w-12 h-12" />
                </div>
                <span className="text-sm font-medium text-purple-800 dark:text-blue-300">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={startGame}
            className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-purple-600 dark:to-blue-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white transform hover:scale-110 transition-all duration-300"
          >
            <Play size={32} fill="white" />
          </button>
        </div>
      )}

      {gameStarted && (
        <>
          <div className="mb-6 flex items-center gap-4 relative w-full max-w-4xl">
            <button 
              onClick={() => {
                setGameOver(false);
                backToSkills();
              }}
              className="p-2 bg-blue-100 dark:bg-purple-700 text-blue-800 dark:text-white rounded-full shadow-md hover:scale-110 transition-transform"
              aria-label="Back to skills"
            >
              <ArrowLeftCircle size={24} />
            </button>
            
            <div className="bg-blue-100 dark:bg-gray-800 px-6 py-3 rounded-full shadow-sm text-blue-800 dark:text-green-400">
              <span className="font-medium">Score: {score}</span>
            </div>

            {gameOver && (
              <button 
                onClick={resetGame}
                className="ml-auto p-2 bg-red-100 dark:bg-red-800 text-red-600 dark:text-white rounded-full shadow-md hover:scale-110 transition-transform"
              >
                <RotateCcw size={24} />
              </button>
            )}
          </div>

          <div className="border-4 border-purple-200 dark:border-purple-700 rounded-xl overflow-hidden bg-purple-50 dark:bg-gray-800 shadow-lg">
            {Array.from({ length: GRID_SIZE }).map((_, y) => (
              <div className="flex" key={y}>
                {Array.from({ length: GRID_SIZE }).map((_, x) => (
                  <div 
                    key={`${x}-${y}`} 
                    className="w-4 h-4 sm:w-6 sm:h-6 border border-purple-100 dark:border-gray-700 flex items-center justify-center"
                  >
                    {getCellContent(x, y)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {isMobile && (
            <div className="mt-8 grid grid-cols-3 gap-3 w-48 ">
              <div className="col-start-2">
                <button 
                  onClick={() => handleDirectionChange('UP')} 
                  className="p-3 bg-blue-400 dark:bg-purple-700 rounded-xl shadow-md"
                >
                  <ArrowUp className="text-white" />
                </button>
              </div>
              <div className="col-start-1 row-start-2">
                <button 
                  onClick={() => handleDirectionChange('LEFT')} 
                  className="p-3 bg-blue-400 dark:bg-purple-700 rounded-xl shadow-md"
                >
                  <ArrowLeft className="text-white" />
                </button>
              </div>
              <div className="col-start-3 row-start-2">
                <button 
                  onClick={() => handleDirectionChange('RIGHT')} 
                  className="p-3 bg-blue-400 dark:bg-purple-700 rounded-xl shadow-md"
                >
                  <ArrowRight className="text-white" />
                </button>
              </div>
              <div className="col-start-2 row-start-3">
                <button 
                  onClick={() => handleDirectionChange('DOWN')} 
                  className="p-3 bg-blue-400 dark:bg-purple-700 rounded-xl shadow-md"
                >
                  <ArrowDown className="text-white" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {gameOver && (
            <div className="text-red-500 dark:text-red-400 text-2xl font-bold mb-6">
              Game Over
            </div>
      )}
    </div>
  );
}