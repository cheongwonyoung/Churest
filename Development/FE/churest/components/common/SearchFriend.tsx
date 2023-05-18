import { searchFriend } from '@/apis/navbar';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
// import ModalBlackBg from './ModalBlackBg';
import SearchResult from './SearchResult';
import { useRecoilState, useRecoilValue } from 'recoil';
import { openSearchAtom } from '@/atoms/modal';
import { loginAtom } from '@/atoms/login';
import Image from 'next/image';
import { images } from '@/public/assets/images';

interface ResultType {
  memberId: number;
  avatarId: number;
  nickname: string;
}

export default function SearchFriend() {
  const [isSearchOpen, setIsSearchOpen] = useRecoilState(openSearchAtom);
  const closeModal = () => {
    setIsSearchOpen({ isModal: false });
  };
  const memberId = useRecoilValue(loginAtom).id;
  const [nickname, setNickname] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const handleSearch = (e: any) => {
    setNickname(e.target.value);
  };

  const [searchList, setSearchList] = useState<ResultType[]>([]);

  const goSearchFriends = useMutation(
    (search: { memberId: number; nickname: string }) =>
      searchFriend(search.memberId, search.nickname),
    {
      onSuccess(data) {
        setSearchList(data.data);
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
          <div className="modal-title">
            <Image
              src={images.search_navbar_img}
              width={35}
              height={35}
              alt=""
            />{' '}
            친구 검색
          </div>
          <input
            placeholder="닉네임을 입력해주세요"
            className="inside-clay"
            value={nickname}
            onChange={(e) => handleSearch(e)}
          />
          <div className="bottom overflow-y-scroll scroll-bar center">
            {
              // <div>아무것도없다</div>

              searchActive == true ? (
                <div>
                  {searchList.length == 0 ? (
                    <p style={{ color: 'gray' }}>
                      해당 유저를 찾을 수 없습니다.
                    </p>
                  ) : (
                    <div className="search-result">
                      <SearchResult list={searchList}></SearchResult>
                    </div>
                  )}
                </div>
              ) : (
                <p></p>
              )
            }
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .bottom {
            width: 80%;
            height: 50%;
            margin-top: 30px;
            overflow-x: hidden;
          }
          .search-result {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            justify-content: center;
            align-items: center;
          }
          p {
            width: 400px;
            text-align: center;
          }
          input {
            width: 300px;
            height: 40px;
            outline: 0px;
            border: none;
            text-align: center;
            margin-top: 10px;
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

          /* 스크롤바 설정*/
          .scroll-bar::-webkit-scrollbar {
            width: 6px;
          }

          /* 스크롤바 막대 설정*/
          .scroll-bar::-webkit-scrollbar-thumb {
            background: linear-gradient(
              #fcf7ea,
              rgba(198, 255, 124, 0.473),
              #fcf7ea
            );
            border-radius: 25px;
          }

          /* 스크롤바 뒷 배경 설정*/
          .scroll-bar::-webkit-scrollbar-track {
            background-color: #b1b1b11f;
          }
        `}
      </style>
    </>
  );
}
