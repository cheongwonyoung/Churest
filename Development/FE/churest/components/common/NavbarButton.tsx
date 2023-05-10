import { images } from '@/public/assets/images';
import Image from 'next/image';
import css from 'styled-jsx/css';
import Link from 'next/link';
type Props = {
  image: string;
  title: string;
};
export default function NavbarButton({ image, title }: Props) {
  const style = css`
    .container {
      width: 80px;
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.7);
    }
    .container:hover {
      background: rgba(199, 218, 255, 0.7);
    }
    .content {
      font-size: 12px;
      text-align: center;
      font-weight: bold;
      margin-bottom: 5px;
    }
  `;

  return (
    <>
      <div className="container gray-clay">
        {/* <Link href={link} style={{ textDecoration: 'none' }}> */}
        <Image src={images[image]} width={50} height={50} alt="" />
        <p className="content">{title}</p>
        {/* </Link> */}
      </div>
      <style jsx>{style}</style>
    </>
  );
}
