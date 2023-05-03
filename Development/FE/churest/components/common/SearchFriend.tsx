import { searchFriend } from '@/apis/navbar';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';

export default function SearchFriend() {
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
        if (nickname === "") {
          setSearchActive(false);
        } else {
          setSearchActive(true);
          goSearchFriends.mutate({ memberId, nickname });
        }
      }, [nickname]);
    

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="닉네임을 검색해주세요"
                    onChange={(e) => handleSearch(e)}
                />
                
            </div>
        </>
  );
}
