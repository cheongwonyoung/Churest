import { takeTree } from '@/apis/churest';
import { forestAtom } from '@/atoms/inp';
import { loginAtom } from '@/atoms/login';
import { createArticleAtom } from '@/atoms/modal';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export default function TagTaker() {
  const [article, setArticle] = useRecoilState(createArticleAtom);
  const userInfo = useRecoilValue(loginAtom);

  const setTiming = useSetRecoilState(forestAtom);
  const getForestInfo = () => {
    setTiming((prev) => !prev);
  };
  const { mutate } = useMutation(
    (data: {
      boardId: number;
      memberId: number;
      locationInfo: {
        spot: number;
      };
    }) => takeTree(data),
    {
      onSuccess() {
        getForestInfo();
        setArticle((prev) => {
          return {
            ...prev,
            isTagged: false,
            isTagModal: false,
            isSelect: false,
            spot: -1,
            boardId: -1,
          };
        });
      },
    }
  );

  const goTake = () => {
    const data = {
      boardId: article.boardId,
      memberId: userInfo.id,
      locationInfo: {
        spot: article.spot,
      },
    };
    mutate(data);
  };

  return (
    <div className="blue-clay" style={{ width: '700px' }}>
      <div className="taker-container">
        <p>선택한 위치에 나무를 옮겨심으시겠습니까?</p>
        <div className="btn-box">
          <button className="green-btn" onClick={goTake}>
            예
          </button>
          <button
            className="green-btn no-btn"
            onClick={() => {
              setArticle((prev) => {
                return { ...prev, isTagModal: false };
              });
            }}
          >
            아니오
          </button>
        </div>
      </div>
      <style jsx>{`
        .taker-container {
          margin-top: 1rem;
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 48px;
        }
        .taker-container {
          font-size: 32px;
        }
        .btn-box {
          display: flex;
          gap: 48px;
        }
        .no-btn {
          background: linear-gradient(315deg, #bb72ff 0%, #ff8f6d 100%);
        }
      `}</style>
    </div>
  );
}
