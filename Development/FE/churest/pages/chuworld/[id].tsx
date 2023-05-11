// import CloudMap from '@/components/chuworld/CloudMap';
import { useEffect } from 'react';
import ChuWorldList from '@/components/chuworld/ChuWorldList';
import ChuWorldNavbar from '@/components/chuworld/ChuWorldNavbar';
import { useQuery } from 'react-query';
import { getChuworld } from '@/apis/chuworld';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';

export default function Chuworld() {
  const memberId = useRecoilValue(loginAtom).id;
  const { data, refetch } = useQuery('getChu', () => getChuworld(memberId), {
    onSuccess(data) {
      console.log(data);
    },
  });
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="root">
      <ChuWorldNavbar />
      {/* <CloudMap /> */}
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
