// import CloudMap from '@/components/chuworld/CloudMap';
import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import ChuWorldList from '@/components/chuworld/ChuWorldList';
// import { images } from '@/public/assets/images';
import ChuWorldNavbar from '@/components/common/ChuWorldNavbar';
import { useQuery } from 'react-query';
import { getChuworld } from '@/apis/chuworld';
import { useRecoilValue } from 'recoil';
import { loginAtom } from '@/atoms/login';

export default function Chuworld() {
  // const [isShow, setIsShow] = useState(true);
  const memberId = useRecoilValue(loginAtom).id;
  const { data, refetch } = useQuery('getChu', () => getChuworld(memberId), {
    onSuccess(data) {
      console.log(data);
    },
  });
  useEffect(() => {
    refetch();
  }, []);

  // console.log(data);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsShow(false);
  //   }, 5000);
  // }, []);

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

    // <AnimatePresence mode="wait">
    //   {/* {isShow && ( */}
    //   <motion.div>
    //
    //   </motion.div>
    //   {/* )} */}
    //   {/* {!isShow && <ChuWorldItem />} */}
    // </AnimatePresence>
  );
}
