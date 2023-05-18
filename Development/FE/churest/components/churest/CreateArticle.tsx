import WeatherPicker from './WeatherPicker';
import { useRef, useState } from 'react';
import ImgUploader from './ImgUploader';
import TagPicker from './TagPicker';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { createArticleAtom } from '@/atoms/modal';
import { loginAtom } from '@/atoms/login';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { getForest, goCreateArticle } from '@/apis/churest';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';
import { forestAtom } from '@/atoms/inp';

type Props = {
  treeId: number;
};

// 850 700
export default function CreateArticle({ treeId }: Props) {
  const [weather, setWeather] = useState<
    '맑음' | '흐림' | '비' | '안개' | '눈' | '천둥번개'
  >('맑음');

  const handleWeather = (
    x: '맑음' | '흐림' | '비' | '안개' | '눈' | '천둥번개'
  ) => {
    setWeather(x);
  };
  const [isCreate, setIsCreate] = useRecoilState(createArticleAtom);

  const [files, setFiles] = useState<File[]>([]);

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const dateRef = useRef(null);

  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);

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

  //태그 로직
  const [pickedTag, setPickedTag] = useState<
    { [key: string]: number | string }[]
  >([]);

  const addPickedTag = (friend: { [key: string]: number | string }) => {
    if (pickedTag.length == 6) {
      alert('최대 6명까지 태그 가능합니다.');
    } else {
      if (pickedTag.indexOf(friend) == -1) {
        setPickedTag((prev) => [...prev, friend]);
      }
    }
  };

  const deleteTag = (friend: { [key: string]: number | string }) => {
    setPickedTag((prev) => prev.filter((f) => f != friend));
  };

  const forestId = useRouter().query.id;
  const setTiming = useSetRecoilState(forestAtom);
  const getForestInfo = () => {
    setTiming((prev) => !prev);
  };

  const { mutate: submit } = useMutation((info: any) => goCreateArticle(info), {
    onSuccess(data, variables, context) {
      // console.log('성공');
      // console.log(data);
      getForestInfo();
      setIsCreate((prev) => {
        return { ...prev, isModal: false, isSelect: false };
      });
      // closeModal();
      // changeToSelect();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '추억 나무 심기 완료',
        showConfirmButton: false,
        timer: 1000,
      });
      //  refetch();
    },
    onError(error, variables, context) {
      // console.log('넌 실패밖에 모르는 하남자야');
      // console.log(error);
      // console.log(variables);
    },
  });

  const spot = isCreate.spot;
  const memberId = useRecoilValue(loginAtom).id;
  const createArticle = () => {
    // console.log('추억 심기 클릭');

    if (data.title == '') {
      //  제목 필수
      // titleRef.current.focus();
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '제목을 입력해주세요.',
        showConfirmButton: false,
        timer: 1000,
      });
    } else if (data.content == '') {
      //  내용 필수
      // contentRef.current.focus();
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '내용을 입력해주세요.',
        showConfirmButton: false,
        timer: 1000,
      });
    } else if (data.date == '') {
      //  날짜 필수
      // dateRef.current.focus();
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '날짜를 입력해주세요.',
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      const formData = new FormData();
      Object.values(files).forEach((file) => {
        formData.append('fileList', file);
      });
      const tagList = pickedTag.map((picked) => picked['memberId']);
      const writeInfo = {
        content: data.content,
        spot,
        memberId,
        tagList,
        title: data.title,
        weather,
        date: data.date,
        treeId,
      };
      // console.log(treeId);
      formData.append('writeInfo', JSON.stringify(writeInfo));
      submit({ formData });
    }
  };

  return (
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
            ref={titleRef}
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
              max={today}
              ref={dateRef}
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
            ref={contentRef}
            onChange={(e) => handleData(e)}
            placeholder="무슨 일이 있었나요?"
            maxLength={140}
          />
        </div>
        <div>
          <p className="tagName">태그</p>
          <TagPicker
            pickedTag={pickedTag}
            addPickedTag={addPickedTag}
            deleteTag={deleteTag}
          />
        </div>
        <button className="submitBtn" onClick={createArticle}>
          추억 심기
        </button>
      </div>
      <style jsx>
        {`
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

          .dateweather {
            display: flex;
            justify-content: space-between;
            width: 100%;
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
            width: 319px;
            resize: none;
            height: 280px;
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
        `}
      </style>
    </div>
  );
}
