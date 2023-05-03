import { modifyMyBird } from '@/apis/mypage';
import Image from 'next/image';
import birdImg from '@/public/assets/bird_1_img.png';
import { useState } from 'react';
import { useMutation } from 'react-query';

type Props = {
  bird: number;
};

export default function NewBird({ bird }: Props) {
  const [name, setName] = useState('');
  const handleName = (e: any) => {
    setName(e.target.value);
  };

  const clickChangeName = () => {
    changeName.mutate();
  };

  const changeName = useMutation(
    () => modifyMyBird({ memberBirdId: bird, nickname: name }),
    {
      onSuccess: (data) => {
        console.log(data.data);
      },
    }
  );

  return (
    <>
      <div className="blue-clay container">
        <div className="bird-title">New Bird</div>
        <div className="bird-img">
          <Image src={birdImg} alt="birdImg" width={200} />
        </div>
        <div className="inside-clay bird-input center">
          <input
            type="text"
            placeholder="새로운 새의 이름을 지어주세요!"
            onChange={(e) => handleName(e)}
          ></input>
        </div>
        <button className="green-btn" onClick={clickChangeName}>
          확인
        </button>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 400px;
          height: 450px;
        }
        input {
          width: 200px;
          background: transparent;
          outline: 0px;
          border: none;
          text-align: center;
        }
        input::placeholder {
          color: rgba(169, 162, 214, 1);
        }
        .bird-input {
          width: 300px;
          height: 40px;
          margin-bottom: 10px;
        }
        .bird-title {
          position: relative;
          font-family: 'Montserrat';
          font-style: normal;
          font-weight: 700;
          font-size: 80px;
          line-height: 134px;
          letter-spacing: -0.02em;
          color: #fff5e0;
          text-shadow: -1px 0px rgba(35, 34, 91, 0.6),
            0px 1px rgba(35, 34, 91, 0.6), 1px 0px rgba(35, 34, 91, 0.6),
            0px -1px rgba(35, 34, 91, 0.6);
          margin-bottom: 150px;
        }
        .bird-img {
          position: absolute;
          margin-bottom: 5%;
        }
        .confirm {
          poisition: static;
        }
      `}</style>
    </>
  );
}
