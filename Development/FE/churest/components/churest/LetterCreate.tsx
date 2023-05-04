import { writeLetter } from '@/apis/letterbox';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';

import Image from 'next/image';
import { images } from '@/public/assets/images';

export default function Letter() {

    const fromMemberId = 1;
    const toMemberId = 2;

    const [content, setContent] = useState('');
    const handleLetter = (e: any) => {
        setContent(e.target.value);
      };
    
      const clickCreateLetter = () => {
        createLetter.mutate({content:content, fromMemberId:fromMemberId, toMemberId:toMemberId});
      };

      const createLetter = useMutation(
        (writeInfo:{content: string;
            fromMemberId: number;
            toMemberId: number;}) => writeLetter(writeInfo),
        {
          onSuccess: (data) => {
            console.log("방명록 작성 성공");
            console.log(data.data);
            // navigate
          },
          onError: (error) => {
            console.log('방명록 에러다');
            console.log(error);
          },
        }
      );
    return (
      <>
      
            <div
              className="letter blue-clay"
              style={{
                backgroundImage: 'url(@/public/assets/letter_img.png)',
                width: '400px',
                height: '550px',
              }}
            >
              <Image src={images.letter_img} alt="" width={380} height={380} />
              <div className="input">
              <input
            type="text"
            placeholder="방명록을 남겨주세요!"
            onChange={(e) => handleLetter(e)}
          ></input>
        
        <button className="green-btn" onClick={clickCreateLetter}>
          입력
        </button>
                </div>
            </div>

        <style jsx>{`
          .letter {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .input {
            position: absolute;
            width: 225px;
          }
        `}</style>
      </>
    );
  }