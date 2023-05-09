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
    }
    .container:hover {
      background: #c7daff;
    }
    .content {
      font-size: 10px;
      text-align: center;
    }
  `;

  return (
    <>
      <div className="container gray-clay">
        {/* <Link href={link} style={{ textDecoration: 'none' }}> */}
        <Image src={images[image]} width={60} height={60} alt="" />
        <p className="content">{title}</p>
        {/* </Link> */}
      </div>
      <style jsx>{style}</style>
    </>
  );
}
