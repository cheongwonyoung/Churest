
import Image from 'next/image';
import frameImg from '@/public/assets/letter_img.png';

export default function LetterBox() {
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
        <Image src={frameImg} alt="" width={380} />
        <div className="input">안녕하떼요 당신에게 편지를 남깁니다.</div>
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
