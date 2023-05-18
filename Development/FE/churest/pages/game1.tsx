import Game13D from '@/components/Game1/Game13D';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';

export default function Game1() {
  const [startNum, setStartNum] = useState(4);
  const starts = () => {
    switch (startNum) {
      case 3:
        return 3;
      case 2:
        return 2;
      case 1:
        return 1;
      case 0:
        return 'Start!';
    }
  };
  const resetStart = () => {
    setStartNum(4);
  };
  useEffect(() => {
    setInterval(() => {
      setStartNum((prev) => prev - 1);
    }, 1000);
  }, []);

  return (
    <div className="game-container">
      <div className={`spacebar ${startNum < 1 && 'box vibration'}`}>
        <div>
          <p>SpaceBar</p>
        </div>
      </div>
      {startNum > -1 && (
        <div className="start">
          <p>{starts()}</p>
        </div>
      )}
      {startNum > -1 && (
        <div className="game-title">
          <p>뱁새를 이겨라!</p>
        </div>
      )}
      <Canvas shadows>
        <Game13D startNum={startNum} resetStart={resetStart} />
      </Canvas>
      <style jsx>
        {`
          .game-container {
            width: 100vw;
            height: 100vh;
            position: relative;
            background-image: url('https://images.pexels.com/photos/627823/pexels-photo-627823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
            background-size: cover;
          }
          .game-title {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            width: 100vw;
          }
          .game-title p {
            font-size: 70px;
            font-weight: 900;
            margin-top: 48px;
          }
          .spacebar {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            width: 100vw;
            height: 80vh;
          }
          .spacebar div {
            width: 300px;
            height: 80px;
            z-index: 100;
            display: flex;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
            background-color: #ebebeb8c;
            border-radius: 10px;
            box-shadow: 0px 3px 3px 0px rgba(209, 209, 209, 0.7),
              inset 0px -1px 8px 0px rgba(145, 145, 145, 0.9),
              inset 0px 11px 28px 0px rgb(255, 255, 255, 0.4);
            padding-left: 12px;
          }
          .spacebar div p {
            font-weight: 900;
            color: rgb(155, 155, 155);
            margin: 0;
            font-size: 40px;
          }
          .start {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
          }
          .start p {
            font-size: 150px;
            z-index: 30;
            font-weight: 900;
            text-shadow: 32px;
            color: rgb(255, 0, 0);
          }
          .box.vibration {
            animation: vibration 0.1s infinite;
          }

          @keyframes vibration {
            from {
              transform: rotate(1deg);
            }
            to {
              transform: rotate(-1deg);
            }
          }
        `}
      </style>
    </div>
  );
}
