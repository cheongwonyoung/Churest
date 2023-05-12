
import { squareModalAtom } from '@/atoms/modal';
import { useRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { getDonateInfo } from '@/apis/square';
import Image from 'next/image';
import { images } from '@/public/assets/images';

type Props = {
  memberId: number;
};

export default function SquareDonate({ memberId }: Props) {

    const [isDonateOpen, setIsDonateOpen] = useRecoilState(squareModalAtom);
    const [myDonateTree, setMyDonateTree] = useState(0);
    const [totalDonateTree, setTotalDonateTree] = useState(0);

  const clickCloseButton = () => {
    setIsDonateOpen({ isModal: false });
  };

  useQuery('donate', () => getDonateInfo(Number(memberId)),{
    onSuccess(data) {
      setMyDonateTree(data.data.myDonateTreeCount);
      setTotalDonateTree(data.data.totalDonateTreeCount);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <div className="blue-clay" style={{ width: '700px' }}>
        <div className='content-container'>
        
            {/* 기부 현황 보기 */}
            <div className='title'>
                여러분들이 키운 소중한 나무는 프로젝트가 끝나면
            </div>
            <div className='title'>
                산불 피해 지역에 기부됩니다.
            </div>
            
            <div className='item-container'>
                {/* <div className='title-grid'> */}
                <div className='title-flex'>
<p>

                우리가 다같이 키운 나무
</p>
<p>

           내가 키운 나무
</p>
                </div>

            {/* </div> */}
                <Image
                    src={images.save_earth_img}
                    alt="save_earth_img"
                    width={80}
                    height={80} 
                /> 
                {totalDonateTree}그루
                <Image
                    src={images.save_plant_img}
                    alt="save_plant_img"
                    width={80}
                    height={80} 
                /> 
                {myDonateTree}그루
            </div>
      </div>
      
      <div className="center" style={{ margin: '20px 0 20px 0' }}>
          <button className="green-btn" onClick={clickCloseButton}>
            닫기
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .content-container {
          justify-content: center;
          margin: 20px;
        }
        .title {
            font-weight: bold;
            font-size: 20px;
            margin: 5%;
            text-align: center;
        }
        .title-flex {
            display:flex
            justify-content:

        }
        .item-container {
            display:flex
            flex-direction:columns;
        }
        .item-grid:
      `}</style>
    </>
  );
}
