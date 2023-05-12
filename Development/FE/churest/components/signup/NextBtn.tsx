type Props = {
  comment: string;
  logic(): void;
};

export default function NextBtn({ comment, logic }: Props) {
  return (
    <>
      <div onClick={logic} className="green-btn center">
        <p>{comment}</p>
        {/* {icon && <p className="">{icon}</p>} */}
      </div>
      <style jsx>
        {`
          p {
            font-family: 'MICEGothic Bold';
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
}
