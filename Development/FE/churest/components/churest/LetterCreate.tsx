import { writeLetter } from '@/apis/letterbox';
import { useState } from 'react';
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
              <Image src={images.letter_img} alt="" width={380} height={530} />
              <div className="input">
                <textarea
                    className="letter-box"
                    placeholder="방명록을 남겨주세요!"
                    onChange={(e) => handleLetter(e)}
                />
        
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
          .green-btn {
                cursor: pointer;
                color: white;
                width: 180px;
                height: 35px;
                border: none;
                background: linear-gradient(315deg, #f0ff94 0%, #1eb0e9 100%);
                border-radius: 12px;
                margin: 10% 10%;
              }
            .input {
                position: absolute;
                justify-content: center;
                align-items: center;
                width: 225px;
                height:300px;
            }
            .letter-box {
                padding: 0 15%;
                height: 230px;
                border:none;
                background-color: transparent;
                text-align: center;
            }
          
        `}</style>
      </>
    );
  }