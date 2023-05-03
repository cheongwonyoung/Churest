import Image from 'next/image';
import images from '@/public/assets/memory_backimg.png';
import SearchBar from '@/components/common/SearchBar';

export default function MemoryCreate() {
  let memberId = 1;

  return (
    <>
      <div>
        <SearchBar></SearchBar>
        <Image src={images} width={1000} height={700} alt="추억생성" />
        <div className=""></div>
      </div>
      <style jsx>{``}</style>
    </>
  );
}
