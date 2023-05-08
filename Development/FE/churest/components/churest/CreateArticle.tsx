import { images } from '@/public/assets/images';
import Image from 'next/image';
import WeatherPicker from './WeatherPicker';
import { useState } from 'react';
import ImgUploader from './ImgUploader';

// 850 700
export default function CreateArticle() {
  const [pickedWeather, setPickedWeather] = useState<
    '맑음' | '흐림' | '비' | '안개' | '눈' | '천둥번개'
  >('맑음');

  const handleWeather = (
    x: '맑음' | '흐림' | '비' | '안개' | '눈' | '천둥번개'
  ) => {
    setPickedWeather(x);
  };

  const [files, setFiles] = useState<File[]>([]);

  const addFiles = (acceptedFiles: File[]) => {
    setFiles([
      ...files,
      ...acceptedFiles.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      }),
    ]);
  };

  return (
    <div className="articleContainer">
      <div className="inputBox">
        <div className="left">
          <div>
            <p>제목</p>
            <input type="text" className="title" />
          </div>
          <div className="dateweather">
            <div className="dateBox box">
              <p>날짜</p>
              <input className="date" type="date" />
            </div>
            <div className="weatherBox box">
              <p>날씨</p>
              <WeatherPicker
                handleWeather={handleWeather}
                pickedWeather={pickedWeather}
              />
            </div>
          </div>
          <div>
            <p>사진</p>
            <ImgUploader addFiles={addFiles} files={files} />
          </div>
        </div>
        <div className="right"></div>
      </div>
      <Image src={images.memory_img} width={850} height={700} alt="" />
      <style jsx>
        {`
          .articleContainer {
            position: relative;
          }
          p {
            color: #a9a2d6;
            font-size: 20px;
          }
          .title {
            height: 36px;
            width: 335px;
            border-radius: 10px;
          }
          .inputBox {
            position: absolute;
            z-index: 51;
            width: 100%;
            height: 100%;
            display: flex;
          }
          .left {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 50px 25px 0px 65px;
            gap: 20px;
          }
          .right {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 50px 65px 0px 25px;
          }
          .dateweather {
            display: flex;
            justify-content: space-between;
          }
          .dateBox {
            width: 45%;
            padding-top: 4px;
            gap: 8px;
          }
          .weatherBox {
            width: 48%;
            padding-top: 4px;
            gap: 8px;
          }
          .date {
            width: 100%;
            height: 36px;
            border: 0.5px black solid;
            text-align: center;
            font-size: larger;
            padding: 3px;
            border-radius: 10px;
          }
          .box {
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
    </div>
  );
}
