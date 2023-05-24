import Image from 'next/image';
import { images } from '@/public/assets/images';
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

type Props = {
  plusStep(): void;
  step: number;
  plusPage(): void;
  minusPage(): void;
  page: number;
};

export default function PickTree({
  plusStep,
  step,
  plusPage,
  minusPage,
  page,
}: Props) {
  const treeInfo = [
    {
      name: '비몽사목',
      desc: '넣지 말자고 했는데 개발자가 잠이 부족해 깜빡했는지 최종까지 함께 온 나무. 하루에 6시간은 꼭 자자.',
    },
    {
      name: '도라에몽 물주목',
      desc: '도라에몽 주먹과 꼭 닮은 열매를 맺는 나무. 혹시 모른다. 다 자라면 내 소원을 들어줄지도? 주머니 열어.',
    },
    {
      name: '거들먹거들목',
      desc: '사람이 지나갈 때 튀어나온 가지로 몰래 때린다는 소문이 있어 붙여진 이름. 거들먹 거리는 느낌의 양아치 나무.',
    },
    {
      name: '회오리감자',
      desc: '어쩐지 놀이공원 앞에서 많이 본 것 같다. 주변에 가면 달콤 짭짤한 맛이 날 것 같은 회오리 감자 모양의 나무.',
    },
    {
      name: '커몽커목',
      desc: '평범하게 생긴 나무라 사람들이 찾지 않을까 싶어 이름에 힘을 줘보았다. 우리 나무 가까이서 보면 더 귀여운데... 커몬커몬!',
    },
    {
      name: '에그목니나',
      desc: '벚꽃이 피면 사람들이 나무를 발로 자꾸 차서 붙여진 이름. 에구머니나! 우리 나무 차지 마세요!',
    },
    {
      name: '쥐구목',
      desc: '중간에 구멍이 뻥 뚫려 있는 나무. 계속 쳐다 보고 있으면 귀여운 다람쥐가 나온다고 한다. 아닐 수도 있음.',
    },
    {
      name: '엠씨목',
      desc: '사랑니를 닮은 동글동글 귀여운 모양의 나무. 뽑으면 내가 아플 것 같다.',
    },
    {
      name: '탕수육 부목찍목',
      desc: '탕수육 부먹이에요 찍먹이에요? 궁금해요.',
    },
  ];

  return (
    <div className="inputBox">
      <div className="left left-add">
        <div className="box">
          <div className="tree-title">
            <p>어떤 나무를 심을건가요?</p>
          </div>
          <div className="tree-selector">
            <div
              className={page == 1 ? 'arrow-disabled' : 'arrow'}
              onClick={minusPage}
            >
              <MdOutlineArrowBackIos />
            </div>
            <div className="tree-img">
              <Image
                src={images[`tree_${page}_img`]}
                width={280}
                height={340}
                alt=""
              />
            </div>
            <div
              className={page == 9 ? 'arrow-disabled' : 'arrow'}
              onClick={plusPage}
            >
              <MdOutlineArrowForwardIos />
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="box">
          <div>
            <div className="name-box">
              <p className="name-class">이름 :</p>
              <p className="tree-info">{treeInfo[page - 1].name}</p>
            </div>
            <div className="name-box">
              <p className="name-class">설명 :</p>
              <p className="tree-info">{treeInfo[page - 1].desc}</p>
            </div>
          </div>
          <button onClick={plusStep} className="submitBtn">
            나무 선택
          </button>
        </div>
      </div>
      <style jsx>{`
        .tree-selector {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .arrow {
          font-size: 24px;
          cursor: pointer;
          font-weight: 700;
        }
        .arrow-disabled {
          font-size: 24px;
          color: rgb(148, 148, 148);
          font-weight: 700;
        }
        .box {
          height: 100%;
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .tree-title {
          font-size: 24px;
          font-weight: 600;
          color: #8b80ca;
          margin-bottom: 75px;
        }
        .name-box {
          width: 100%;
          display: flex;
          margin-bottom: 40px;
        }
        .name-class {
          font-size: 24px;
          font-weight: 600;
          color: #8b80ca;
          width: 70px;
        }
        .tree-info {
          font-size: 24px;
          font-weight: 600;
          color: #000000;
          width: 250px;
        }
        .right .box {
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
}
