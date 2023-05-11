import { deleteLetter } from '@/apis/letterbox';
import { useMutation } from 'react-query';
import Image from 'next/image';
import { images } from '@/public/assets/images';

type Props = {
  letters: any;
};

export default function LetterSlide({ letters }: Props) {
  const deleteArticleItem = useMutation(
    (deleteInfo: { fromMemberId: number; GuestBookId: number }) =>
      deleteLetter(deleteInfo),
    {
      onSuccess: (data) => {
        console.log('성공 in mutation success');
        console.log(data);
        // refetch();
        // navigate("/방명록");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const goDeleteArticle = async (letter: any) => {
    deleteArticleItem.mutate({
      fromMemberId: letter.fromMember.memberId,
      GuestBookId: letter.guestBookId,
    });
  };

  const clickDeleteLetter = (letter: any) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      goDeleteArticle(letter);
      console.log('삭제 완료');
    } else {
      console.log('삭제 취소');
    }
  };

  return (
    <>
      {letters.map((letter: any, idx: number) => {
        return (
          <div key={idx} className="letter blue-clay">
            <div className="input">
              {letter.content}
              {/* 작성자와 사용자 확인 여부 */}
              <div className="letter-buttons">
                <button>수정</button>
                <button onClick={() => clickDeleteLetter(letter)}>삭제</button>
              </div>
            </div>
          </div>
        );
      })}
      <style jsx>{`
        .letter {
          width: 300px;
          height: 500px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url('https://storage.googleapis.com/churest-bucket/project_image/letter_img.png');
          background-size: cover;
        }
        .input {
          width: 225px;
          height: 350px;
          text-align: center;
          display: flex;
          flex-direction: column;
          font-size: 20px;
          font-weight: bold;
        }
        .letter-buttons {
          position: absolute;
          bottom: 150px;
          left: 135px;
          justify-content: center;
          display: flex;
          gap: 20px;
        }
        button {
          border: none;
          background-color: rgba(0, 0, 0, 0);
          width: 80px;
          height: 30px;
          font-size: 20px;
        }
        button:hover {
          cursor: pointer;
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
