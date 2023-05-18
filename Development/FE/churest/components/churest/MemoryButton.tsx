import Image from 'next/image';
import { images } from '@/public/assets/images';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { createArticleAtom } from '@/atoms/modal';

// type Props = {
//   selectSpot: any;
//   changeToSelect: any;
// };
export default function MemoryButton() {
  const [isSelect, setIsSelct] = useRecoilState(createArticleAtom);
  return (
    <div>
      <div className="outside">
        {isSelect.isSelect ? (
          <div
            className="plantContainer"
            onClick={() =>
              setIsSelct((prev) => {
                return {
                  ...prev,
                  isSelect: false,
                  isTagged: false,
                  boardId: -1,
                };
              })
            }
          >
            <div className="plantTree">
              <Image
                src={images.my_tree_img}
                alt="나무심기"
                width={80}
                height={80}
              />
              <p>돌아가기</p>
            </div>
          </div>
        ) : (
          <div
            className="plantContainer"
            onClick={() =>
              setIsSelct((prev) => {
                return {
                  ...prev,
                  isSelect: true,
                  isTagged: false,
                  boardId: -1,
                };
              })
            }
          >
            <div className="plantTree">
              <Image
                src={images.my_tree_img}
                alt="나무심기"
                width={80}
                height={80}
              />
              <p>추억심기</p>
            </div>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .outside {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
          }
          .plantContainer {
            position: fixed;
            bottom: 0;
            display: flex;
            display: flex;
            justify-content: center;
            z-index: 5;
          }
          .plantTree {
            width: 240px;
            height: 120px;
            border-radius: 140px 140px 0 0;
            display: flex;
            justify-content: center;
            background-color: white;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 60px 60px 80px rgba(254, 255, 193, 0.55),
              inset -60px -60px 80px rgb(254, 255, 193),
              inset 1px 1px 5px rgb(254, 255, 193);
          }
          .plantTree:hover {
            cursor: pointer;
            transform: scale(1.05);
            transition: transform 0.5s;
          }
        `}
      </style>
    </div>
  );
}
