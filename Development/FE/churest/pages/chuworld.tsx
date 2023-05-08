import ChuWorldItem from '@/components/chuworld/ChuWorldItem';
import CloudMap from '@/components/chuworld/CloudMap';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ChuWorldList from '@/components/chuworld/ChuWorldList';
export default function chuworld() {
  // const [isShow, setIsShow] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsShow(false);
  //   }, 5000);
  // }, []);

  return (
    <div className="root">
      <ChuWorldList />
      <style jsx>
        {`
          .root {
            weight: 100vw;
            height: 100vh;
          }
        `}
      </style>
    </div>

    // <AnimatePresence mode="wait">
    //   {/* {isShow && ( */}
    //   <motion.div>
    //     <CloudMap />
    //   </motion.div>
    //   {/* )} */}
    //   {/* {!isShow && <ChuWorldItem />} */}
    // </AnimatePresence>
  );
}
