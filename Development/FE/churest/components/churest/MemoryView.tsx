import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { images } from '@/public/assets/images';
import { getMyChurest } from '@/apis/churest';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { loginAtom } from '@/atoms/login';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { wateringTree } from '@/apis/churest';
import { imageUrl } from '@/apis/index';
import { weathers } from '@/utils/weathers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';
import Swal from 'sweetalert2';

type Props = {
  boardId: number;
};
export default function MemoryView({ boardId }: Props) {
  let memberId = useRecoilValue(loginAtom).id;

  const [tagList, setTagList] = useState<any>([]);
  const { data } = useQuery(
    ['myTree', boardId],
    () => getMyChurest(Number(memberId), Number(boardId)),
    {
      onSuccess(data) {
        console.log(boardId + '번 책 열기 성공');
        console.log(data.data);
        setTagList(data?.data.tagList);
      },
      onError(error) {
        console.log('에러다! ');
        console.log(error);
      },
    }
  );

  const clickWatering = () => {
    // console.log(boardId + '물줄게');
    watering.mutate({ boardId, memberId });
  };

  const watering = useMutation(
    (info: { boardId: number; memberId: number }) =>
      wateringTree(info.boardId, info.memberId),
    {
      onSuccess: () => {
        // console.log('물주기성공');
        showAlert('물 주기 성공');
      },
    }
  );

  const showAlert = (text: string) => {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: text,
      showConfirmButton: false,
      timer: 1000,
    });
  };

  const tagItems = tagList.map((item: any, idx: number) => {
    return (
      <>
        <Image
          src={images['avatar_' + item + '_img']}
          alt=""
          width={33}
          height={48}
          style={{ margin: '10px' }}
        ></Image>
      </>
    );
  });

  const weather: '맑음' | '흐림' | '비' | '안개' | '눈' | '천둥번개' =
    data?.data.weather;

  return (
    <>
      <div className="container">
        <div className="child book-grid">
          <div className="top">
            <div className="center">
              <div style={{ width: '60px', height: '50px' }}>
                <Image
                  src={weathers[weather]}
                  alt=""
                  priority
                  width={58}
                  height={50}
                  // fill
                  // style={{ objectFit: 'fit' }}
                ></Image>
              </div>
            </div>
            <div className="center title">{data?.data.title}</div>
            <div className="center" style={{ color: 'gray' }}>
              {data?.data.createdTime}
            </div>
          </div>
          <div className="center" style={{ margin: '30px 100px 30px 50px' }}>
            {tagItems}
          </div>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={true}
            mousewheel={true}
            className="mySwiper"
          >
            {data &&
              data?.data.fileList.map((item: String, idx: number) => {
                return (
                  <>
                    <SwiperSlide key={idx}>
                      <Image
                        src={imageUrl + item}
                        fill
                        alt="image"
                        style={{ borderRadius: '5%' }}
                      ></Image>
                    </SwiperSlide>
                  </>
                );
              })}
          </Swiper>
          <div className="center content">{data?.data.content}</div>
          <div></div>
          <div className="center" onClick={clickWatering}>
            <div className="watering-card content">
              <Image
                className=""
                src={images['watering_icon_img']}
                width={75}
                height={85}
                alt="물주기"
              ></Image>
              <div className="watering-text">물 주기</div>
            </div>
          </div>
        </div>
        <Image
          src={images['memory_img']}
          width={1000}
          height={600}
          alt="추억보기"
        />
      </div>
      <style jsx>{`
        .container {
          position: relative;
           {
            /* z-index: 0; */
          }
        }
        .child {
          position: absolute;
           {
            /* z-index: 1; */
          }
        }
        .book-grid {
          width: 1000px;
          height: 600px;
          display: grid;
          grid-template-columns: 500px 500px;
          grid-template-rows: 150px 260px;
        }
        .content {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 100px 0 50px;
          padding: 15px;
          border-radius: 45px;
        }
        .top {
          margin: 30px 50px 30px 100px;
        }
        .title {
          font-size: larger;
          margin-bottom: 5px;
        }

        .watering-card:hover .watering-text {
          cursor: pointer;
          transition: 0.3s;
          opacity: 1;
        }

        .watering-text {
          cursor: pointer;
          position: absolute;
          opacity: 0;
          color: white;
          text-shadow: 1px 1px 2px black, 0 0 1em blue, 0 0 0.2em blue;
        }
      `}</style>
    </>
  );
}
