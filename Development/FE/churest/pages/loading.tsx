import { images } from '@/public/assets/images';
import Image from 'next/image';

export default function Loading() {
  return <Image src={images.loading} width={300} height={300} alt="" />;
}
