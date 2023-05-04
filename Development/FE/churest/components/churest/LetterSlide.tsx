import Image from 'next/image';
import { images } from '@/public/assets/images';

type Props = {
  letters: any;
};

export default function LetterBox({ letters }: Props) {
  return (
    <>
      {letters.map((letter: any, idx: number) => {
        return (
          <div
            key={idx}
            className="letter blue-clay"
            style={{
              backgroundImage: 'url(@/public/assets/letter_img.png)',
              width: '400px',
              height: '550px',
            }}
          >
            <Image src={images.letter_img} alt="" width={380} height={380} />
            <div className="input">{letter.content}</div>
          </div>
        );
      })}
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
