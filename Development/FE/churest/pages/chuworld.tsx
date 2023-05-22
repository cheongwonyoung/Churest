import { useEffect } from 'react';
import ChuWorldList from '@/components/chuworld/ChuWorldList';
import { useQuery } from 'react-query';
import { getChuworld } from '@/apis/chuworld';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';
import Navbar from '@/components/common/Navbar';
import { Canvas } from '@react-three/fiber';

export default function Chuworld() {
  const memberId = useRecoilValue(loginAtom).id;
  const token = useRecoilValue(loginAtom).accessToken;
  const { data, refetch } = useQuery('getChu', () =>
    getChuworld(token, memberId)
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="root">
      <Navbar types="chuworld" />
      <Canvas shadows>{data && <ChuWorldList data={data.data} />}</Canvas>

      <style jsx>
        {`
          .root {
            width: 100vw;
            height: 100vh;
            background: url('https://storage.googleapis.com/churest-bucket/project_image/chuworld2_img.png');
            background-size: cover;
            background-repeat: no-repeat;
          }
        `}
      </style>
    </div>
  );
}
