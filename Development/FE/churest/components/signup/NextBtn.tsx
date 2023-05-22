type Props = {
  comment: string;
  type: string;
  logic(): void;
};

export default function NextBtn({ comment, type, logic }: Props) {
  return (
    <>
      <div
        onClick={logic}
        className={type == 'show' ? 'green-btn center' : 'disable-btn center'}
      >
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
