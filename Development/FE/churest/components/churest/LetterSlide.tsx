import { deleteLetter } from '@/apis/letterbox';
import { useMutation } from 'react-query';
import Image from 'next/image';
import { images } from '@/public/assets/images';

type Props = {
  letters: any;
};

export default function LetterBox({ letters }: Props) {
  const deleteArticleItem = useMutation(
    (deleteInfo: 
      {fromMemberId: number;
        GuestBookId: number;}
      ) => deleteLetter(deleteInfo),
    {
      onSuccess: (data) => {
        console.log("성공 in mutation success");
        console.log(data);
        // refetch();
        // navigate("/letter");
      },
      onError:(error)=>{
        console.log(error);
      }
    }
  );
  const goDeleteArticle = async (letter:any) => {
    deleteArticleItem.mutate({fromMemberId:letter.fromMember.memberId,guestBookId:letter.guestBookId});
  };

  const clickDeleteLetter = (letter:any) => {
    if(confirm("정말 삭제하시겠습니까?")){
      goDeleteArticle(letter);
      console.log("삭제 완료");
    }else{
      console.log("삭제 취소");
    }
  }


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
            idx : {idx} guest_book_id : {letter.guestBookId}
            <div className="input">{letter.content}</div>
            {/* 작성자와 사용자 확인 여부 */}
            <button>수정</button>
            <button onClick={()=>clickDeleteLetter(letter)}>삭제</button>
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
