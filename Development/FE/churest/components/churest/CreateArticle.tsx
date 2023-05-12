import { images } from '@/public/assets/images';
import Image from 'next/image';
import WeatherPicker from './WeatherPicker';
import { useState } from 'react';
import ImgUploader from './ImgUploader';

// 850 700
export default function CreateArticle() {
  const [weather, setWeather] = useState<
    '맑음' | '흐림' | '비' | '안개' | '눈' | '천둥번개'
  >('맑음');

  const handleWeather = (
    x: '맑음' | '흐림' | '비' | '안개' | '눈' | '천둥번개'
  ) => {
    setWeather(x);
  };

  const [files, setFiles] = useState<File[]>([]);

  const addFiles = (acceptedFiles: any) => {
    setFiles([
      ...files,
      ...acceptedFiles.map((file: any) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      }),
    ]);
  };

  const deleteImage = (f: File) => {
    setFiles(files.filter((file) => file !== f));
  };

  const [data, setData] = useState({ title: '', date: '', content: '' });
  const handleData = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="articleContainer">
      <div className="inputBox">
        <div className="left">
          <div className="titleBox">
            <p>제목</p>
            <input
              type="text"
              className="title"
              placeholder="어떤 추억인가요?"
              name="title"
              value={data.title}
              onChange={(e) => handleData(e)}
            />
          </div>
          <div className="dateweather">
            <div className="dateBox box">
              <p>날짜</p>
              <input
                className="date"
                type="date"
                name="date"
                value={data.date}
                onChange={(e) => handleData(e)}
              />
            </div>
            <div className="weatherBox box">
              <p>날씨</p>
              <WeatherPicker handleWeather={handleWeather} weather={weather} />
            </div>
          </div>
          <div>
            <p className="imgName">사진</p>
            <ImgUploader
              addFiles={addFiles}
              files={files}
              deleteImage={deleteImage}
            />
          </div>
        </div>
        <div className="right">
          <div>
            <p className="contentName">내용</p>
            <textarea
              className="content"
              name="content"
              value={data.content}
              onChange={(e) => handleData(e)}
              placeholder="무슨 일이 있었나요?"
            />
          </div>
          <div>
            <p className="tagName">태그</p>
            <div className="tag"></div>
          </div>
          <button className="submitBtn">추억 심기</button>
        </div>
      </div>
      <Image src={images.memory_img} width={850} height={700} alt="" />
      <style jsx>
        {`
          .articleContainer {
            position: relative;
          }
          p {
            color: #8b80ca;
            font-size: 20px;
            font-weight: 700;
          }
          .title,
          .title:focus {
            height: 40px;
            width: 331px;
            border-radius: 10px;
            box-shadow: inset 4px 4px 20px -3px rgba(0, 0, 0, 0.1);
            background-color: transparent;
            border: none;
            outline: none;
            padding-left: 8px;
            font-size: 16px;
            margin-top: 8px;
            font-weight: 700;
          }
          .inputBox {
            position: absolute;
            z-index: 51;
            width: 100%;
            height: 100%;
            display: flex;
          }
          .left {
            width: 335px;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 50px 25px 0px 65px;
            gap: 20px;
          }
          .right {
            width: 335px;
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
          .imgName {
            margin-bottom: 8px;
          }
          .weatherBox {
            width: 48%;
            padding-top: 4px;
            gap: 8px;
          }
          .date {
            width: 100%;
            height: 36px;
            box-shadow: inset 4px 4px 20px -3px rgba(0, 0, 0, 0.1);
            background-color: transparent;
            outline: none;
            text-align: center;
            font-size: larger;
            padding: 3px;
            border-radius: 10px;
            border: none;
            font-weight: 700;
          }
          .box {
            display: flex;
            flex-direction: column;
          }
          .content,
          .content:focus {
            width: 325px;
            resize: none;
            height: 330px;
            border: none;
            border-radius: 10px;
            box-shadow: inset 0 0 20px -3px rgba(0, 0, 0, 0.1);
            padding: 8px;
            background-color: transparent;
            outline: none;
            font-size: 16px;
            font-weight: 600;
          }
          .contentName {
            margin-bottom: 8px;
          }
          .tagName {
            margin-top: 8px;
            margin-bottom: 8px;
          }
          .tag {
            box-shadow: inset 0 0 20px -3px rgba(0, 0, 0, 0.1);
            width: 325px;
            height: 44px;
            border-radius: 10px;
            padding: 8px;
          }
          .submitBtn {
            margin-top: 36px;
            box-shadow: -5px -5px 5px rgba(255, 255, 255, 0.4),
              5px 5px 10px rgba(174, 174, 192, 0.2),
              inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px#fff;
            width: 334px;
            height: 44px;
            border-radius: 10px;
            padding: 8px;
            background-color: rgb(255, 218, 118);
            border: none;
            font-size: 24px;
            font-weight: 700;
            cursor: pointer;
            color: rgb(104, 97, 64);
          }
        `}
      </style>
    </div>
  );
}
