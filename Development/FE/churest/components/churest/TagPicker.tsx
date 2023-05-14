import { searchFriend } from '@/apis/navbar';
import { loginAtom } from '@/atoms/login';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { GrFormClose } from 'react-icons/gr';
import { BiSearchAlt2 } from 'react-icons/bi';

type Props = {
  pickedTag: { [key: string]: number | string }[];
  addPickedTag(e: { [key: string]: number | string }): void;
  deleteTag(e: { [key: string]: number | string }): void;
};

export default function TagPicker({
  pickedTag,
  addPickedTag,
  deleteTag,
}: Props) {
  const [nickname, setNickname] = useState('');
  const memberId = useRecoilValue(loginAtom).id;
  const { refetch } = useQuery('tags', () => searchFriend(memberId, nickname), {
    enabled: false,
    onSuccess(data) {
      console.log(data);
      if (data?.status == 200) {
        setFriends(data?.data);
      } else {
        setFriends([]);
      }
    },
  });
  useEffect(() => {
    if (nickname.length > 0) {
      refetch();
    } else {
      setFriends([]);
    }
  }, [nickname]);

  const [friends, setFriends] = useState<{ [key: string]: number | string }[]>(
    []
  );

  return (
    <div className="tag">
      <div className="pickedBox">
        {pickedTag.map((tag) => {
          return (
            <div className="pickedItem">
              <p className="pickenName">{tag.nickname}</p>
              <p onClick={() => deleteTag(tag)}>
                <GrFormClose />
              </p>
            </div>
          );
        })}
      </div>
      <div className="searchBox">
        <div className="searchLine">
          <p className="searcIcon">
            <BiSearchAlt2 />
          </p>
          <input
            type="text"
            placeholder="추억을 공유할 친구를 찾아봐요."
            className="search"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <p className="deleteIcon" onClick={() => setNickname('')}>
            <GrFormClose />
          </p>
        </div>
        {friends.length > 0 && (
          <div className="tagList">
            {friends.map((friend) => {
              return (
                <div className="tagItem" onClick={() => addPickedTag(friend)}>
                  <p>{friend.nickname}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <style jsx>
        {`
          .tag {
            width: 335px;
            height: 94px;
            border-radius: 10px;
            padding-top: 8px;
            padding-bottom: 8px;
          }
          .tagList {
            margin-top: 4px;
            top: 50px;
            background-color: white;
            border-radius: 10px;
            position: absolute;
            padding: 3px;
            width: 329px;
            box-shadow: inset 4px 4px 20px -3px rgba(0, 0, 0, 0.1);
            background-color: #fef7ed;
            max-height: 80px;
            overflow: auto;
          }
          .search {
            background-color: transparent;
            border: none;
            margin-left: 8px;
            width: 260px;
            font-weight: 600;
          }
          .search:focus {
            outline: none;
          }
          .tagItem {
            gap: 8px;
            padding: 8px;
            font-weight: 600;
          }
          .tagItem:hover {
            background-color: #cab392;
          }
          .tagItem:first-child {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
          .tagItem:last-child {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          .pickedItem {
            box-shadow: inset 0 0 20px -3px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 8px;
            background-color: transparent;
            height: 24px;
            width: 95px;
            border: none;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .pickedBox {
            display: flex;
            flex-wrap: wrap;
            height: 83px;
            row-gap: 1px;
            column-gap: 1px;
            font-weight: 600;
          }

          .pickenName {
            width: 75px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .searchBox {
            width: 100%;
            position: relative;
            margin-top: 4px;
          }
          .searchLine {
            display: flex;
            box-shadow: inset 0 0 20px -3px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 8px;
            align-items: center;
            height: 24px;
            width: 319px;
          }
          .searcIcon {
            text-align: center;
            font-size: 20px;
            height: 20px;
          }
          .deleteIcon {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}
