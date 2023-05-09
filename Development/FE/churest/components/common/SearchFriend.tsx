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
      <div>
        {/* {isSearchOpen && <ModalBlackBg closeModal={closeModal} />} */}
        <div className="blue-clay modal-container ">
          <div className="modal-title">친구 검색</div>
          <input
            placeholder="닉네임을 입력해주세요"
            className="inside-clay"
            value={nickname}
            onChange={(e) => handleSearch(e)}
          />
          <div>
            <p>해당 유저를 찾을 수 없습니다.</p>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          input {
            width: 500px;
            height: 40px;
            outline: 0px;
            border: none;
            text-align: center;
          }
          input::placeholder {
            color: rgba(169, 162, 214, 1);
            font-size: 16px;
            line-height: 40px;
          }
          .container {
            width: 400px;
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow-x: hidden;
            // overflow-y: auto;
            // position: fixed;
            z-index: 50;
          }
        `}
      </style>
    </>
  );
}
