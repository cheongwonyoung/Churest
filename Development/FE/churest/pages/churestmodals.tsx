import LetterBox from '../components/churest/LetterBox';
import ItemShop from '../components/churest/ItemShop';
import NewBird from '../components/churest/NewBird';
import MyBird from '../components/churest/MyBird';
import ChureeView from '../components/churest/MemoryView';

export default function churest() {
  return (
    <>
      <div className="">안녕하떼용 여기는 마이 츄레스트입니다</div>
      {/* <div className="page-center"> */}
      {/* <ChureeView boardId={1}></ChureeView> */}
      {/* </div> */}
      <MyBird></MyBird>
      {/* <LetterBox></LetterBox> */}
      {/* <ItemShop></ItemShop> */}
      <NewBird bird={1}></NewBird>

      <style jsx>{`
        .page-center {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center; /* 수직 정렬 */
          justify-content: center; /* 수평 정렬 */
        }
      `}</style>
    </>
  );
}
