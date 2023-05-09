type Props = {
  comment: string;
  logic(): void;
};

export default function NextBtn({ comment, logic }: Props) {
  return (
    <div onClick={logic} className="">
      <p>{comment} 넥스트 버튼</p>
      {/* {icon && <p className="">{icon}</p>} */}
    </div>
  );
}
