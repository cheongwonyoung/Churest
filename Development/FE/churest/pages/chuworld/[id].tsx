import { useEffect } from 'react';
import ChuWorldList from '@/components/chuworld/ChuWorldList';
import ChuWorldNavbar from '@/components/chuworld/ChuWorldNavbar';
import { useQuery } from 'react-query';
import { getChuworld } from '@/apis/chuworld';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';
import CloudMap from '@/components/common/CloudMap';

export default function Chuworld() {
  const memberId = useRecoilValue(loginAtom).id;
  const { data, isLoading, refetch } = useQuery('getChu', () =>
    getChuworld(memberId)
  );

  useEffect(() => {
    refetch();
  }, []);
  if (isLoading) return <CloudMap />;
  return (
    <div className="root">
      <ChuWorldNavbar />
      {data && <ChuWorldList data={data.data} />}
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
