import Image from 'next/image';
import images from '@/public/assets/memory_backimg.png';

export default function memory() {
  let memberId = 1;

  return (
    <>
      <div>
        <Image src={images} width={850} height={700} alt=""></Image>
        <div className=""></div>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
