import { images } from '@/public/assets/images';
import Image from 'next/image';

export default function Loading() {
  return (
    <div>
      <Image src={images.loading} width={300} height={300} alt="" />;
      <p>임시 로딩 페이쥐</p>
    </div>
  );
}
