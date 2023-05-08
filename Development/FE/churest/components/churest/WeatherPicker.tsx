import { weathers } from '@/utils/weathers';
import Image from 'next/image';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

type Props = {
  handleWeather(x: '맑음' | '흐림' | '비' | '안개' | '눈' | '천둥번개'): void;
  pickedWeather: '맑음' | '흐림' | '비' | '안개' | '눈' | '천둥번개';
};

export default function WeatherPicker({ pickedWeather, handleWeather }: Props) {
  const [isSelect, setIsSelect] = useState(false);

  return (
    <div className="weatherContaier">
      <div className="picked" onClick={() => setIsSelect((prev) => !prev)}>
        <div className="imgName">
          <Image src={weathers[pickedWeather]} width={30} height={30} alt="" />
          <p>{pickedWeather}</p>
        </div>

        <FiChevronDown />
      </div>
      {isSelect && (
        <div className="pickList">
          {Object.entries(weathers).map((weather: any) => {
            return (
              <div
                key={weather[0]}
                className="imgName"
                onClick={() => {
                  handleWeather(weather[0]);
                  setIsSelect(false);
                }}
              >
                <Image src={weather[1]} width={30} height={30} alt="" />
                <p>{weather[0]}</p>
              </div>
            );
          })}
        </div>
      )}
      <style jsx>
        {`
          .weatherContaier {
            width: 100%;
            height: 100%;
          }
          .picked {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: white;
            border: 0.5px black solid;
            border-radius: 10px;
            padding: 3px;
          }
          .imgName {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 3px;
          }
          .picked .imgName:hover {
            background-color: white;
          }
          .imgName:first-child {
            border-radius: 10px 10px 0 0;
          }
          .imgName:last-child {
            border-radius: 0 0 10px 10px;
          }
          .imgName:hover {
            background-color: rgb(141, 247, 255);
          }
          .pickList {
            margin-top: 4px;
            background-color: white;
            border: 0.5px black solid;
            border-radius: 10px;
            position: absolute;
            padding: 3px;
            width: 152.797px;
          }
        `}
      </style>
    </div>
  );
}
