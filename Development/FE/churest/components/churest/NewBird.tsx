import { modifyMyBird } from '@/apis/mypage';
import Image from 'next/image';
import { images } from '@/public/assets/images';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { openShopAtom, newBirdAtom } from '@/atoms/modal';
import Swal from 'sweetalert2';
import { loginAtom } from '@/atoms/login';

export default function NewBird() {
  const bird = useRecoilValue(newBirdAtom).bird;
  const token = useRecoilValue(loginAtom).accessToken;
  const [isShopOpen, setIsShopOpen] = useRecoilState(openShopAtom);
  const [isNewBirdOpen, setIsNewBirdOpen] = useRecoilState(newBirdAtom);

  const [name, setName] = useState('');
  const handleName = (e: any) => {
    setName(e.target.value);
  };

  const clickChangeName = () => {
    changeName.mutate();
  };

  const changeName = useMutation(
    () =>
      modifyMyBird(token, { memberBirdId: bird.memberBirdId, nickname: name }),
    {
      onSuccess: (data) => {
        const alertMsg =
          data.data.bird.name +
          '야!\n너의 이름은 ' +
          data.data.nickname +
          '란다!';

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: alertMsg,
          showConfirmButton: false,
          timer: 1000,
        });

        setIsNewBirdOpen({ isModal: false, bird: {} });
        setIsShopOpen({ isModal: true });
      },
    }
  );

  return (
    <>
      <div className="blue-clay container">
        <div className="bird-title">{bird.bird.name}</div>
        <div className="bird-img">
          <Image
            src={images['bird_' + bird.bird.birdId + '_img']}
            alt="birdImg"
            width={200}
            height={200}
          />
        </div>
        {/* {bird.bird.description} */}
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
          width: 500px;
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
          animation: flying 1s infinite alternate;
        }
        .confirm {
          poisition: static;
        }
      `}</style>
    </>
  );
}
