import { searchFriend } from '@/apis/navbar';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import ModalBlackBg from './ModalBlackBg';
import { useRecoilState } from 'recoil';
import { openSearchAtom } from '@/atoms/modal';

export default function SearchFriend() {
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(openSearchAtom);
  const closeModal = () => {
    setIsSearchOpen({ isModal: false });
  };
  const memberId = 1;
  const [nickname, setNickname] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const handleSearch = (e: any) => {
    setNickname(e.target.value);
  };

  const [searchList, setSearchList] = useState<
    {
      memberId: number;
      avatarId: number;
      nickname: string;
    }[]
  >([]);

  const goSearchFriends = useMutation(
    (search: { memberId: number; nickname: string }) =>
      searchFriend(search.memberId, search.nickname),
    {
      onSuccess(data) {
        setSearchList(data.data);
        console.log(data.data);
      },
    }
  );

  useEffect(() => {
    if (nickname === '') {
      setSearchActive(false);
    } else {
      setSearchActive(true);
      goSearchFriends.mutate({ memberId, nickname });
    }
  }, [nickname]);

  return (
    <>
      <div className="gogo">
        {isSearchOpen && <ModalBlackBg closeModal={closeModal} />}
        <div className="blue-clay container">
          <input
            type="text"
            placeholder="닉네임을 검색해주세요"
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
      <style jsx>
        {`
          .gogo {
            width: 100vw;
            height: 100vh;
          }
          .container {
            width: 400px;
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow-x: hidden;
            overflow-y: auto;
            position: fixed;
            z-index: 50;
          }
        `}
      </style>
    </>
  );
}
