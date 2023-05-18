import { images } from '@/public/assets/images';
import Image from 'next/image';
import TreeModel from './TreeModel';

type Props = {
  item: {
    member: {};
    treeId: number;
    boardId: number;
    treeInfo: {
      file: string;
      name: string;
      description: string;
    };
  };
};

export default function TreeInfo({ item }: Props) {
  const IMAGE_ROOT = process.env.NEXT_PUBLIC_IMAGE_ROOT;
  // console.log('파일명 >>> ' + item.treeInfo);
  console.log(images['reward_bird_img']);

  return (
    <>
      <div className="info-container">
        {/* <p>REWARD</p> */}
        <div className="right tree-info">
          <div>
            <div className="shape-outer shape-inner center">
              <Image
                src={IMAGE_ROOT + item.treeInfo.file}
                width={150}
                height={150}
                alt=""
                style={{ borderRadius: '50%' }}
              />
            </div>
          </div>
          <div className="tree-title ">{item.treeInfo.name}</div>
          {/* <div className="bird-img">
            <Image
              src={images.reward_bird_img}
              width={100}
              height={90}
              alt=""
            />
          </div> */}
          <div className="content">
            {item.treeInfo.description.replace(/\\./gm, '<br>')}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          p {
            text-align: center;
            line-height: 100px;
            color: white;
            font-size: 30px;
          }
          .left {
            position: left;
             {
              /* width: 50%; */
            }
          }
          .shape-outer {
            position: relative;
            display: flex;
            flex-shrink: 0;
            height: calc(170px);
            width: calc(170px);
            background-image: linear-gradient(
              to bottom right,
              #ffcfea,
              #c8abe2,
              #96c9ee
            );
            border-radius: 50%;
          }
          .info-container {
            border-radius: 5%;
            width: 1000px;
            height: 750px;
            display: flex;
            justify-content: space-between;
            background-color: rgba(19, 19, 19, 0.836);
          }
          .tree-info {
            width: 100%;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 50px;
          }
          .tree-title {
            background-color: rgb(255, 246, 235);
            color: #1b435f;
            font-size: 20px;
            padding: 5px;
            border-radius: 10px;
          }
          .content {
            margin-top: 30px;
            text-align: center;
            font-size: 18px;
            line-height: 50px;
          }
        `}
      </style>
    </>
  );
}
