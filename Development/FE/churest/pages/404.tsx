import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="containter">
      <p className="content">페이지를 찾을 수 없습니다.</p>
      <p className="contentTwo">올바른 URL을 입력하였는지 확인하세요.</p>
      <Link href="/churest/0" style={{ textDecoration: 'none' }}>
        <div className="btn">
          <p className="btnContent">나의 숲으로 돌아가기</p>
        </div>
      </Link>

      <style jsx>
        {`
          .content {
            font-size: 48px;
            font-weight: bold;
          }
          .contentTwo {
            font-size: 20px;
          }
          .btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 180px;
            height: 20px;
            padding: 13px;
            background: linear-gradient(to top left, #f0ff94 0%, #1eb0e9 100%);
            box-shadow: 0px 20px 40px 0 #ccedfa;
            border-radius: 20px;
          }
          .btnContent {
            font-size: 20px;
            font-weight: bold;
            color: white;
          }
        `}
      </style>
    </div>
  );
}
