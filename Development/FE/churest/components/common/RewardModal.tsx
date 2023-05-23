import { ReactNode, useEffect } from 'react';

type Props = {
  closeModal(): void;
  modal?: ReactNode;
};

export default function RewardModal({ closeModal, modal }: Props) {
  const escClose = (e: any) => {
    if (e.code == 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escClose);
    return () => {
      document.removeEventListener('keydown', escClose);
    };
  });
  return (
    <div className="blackBg" onClick={closeModal}>
      <div onClick={(e) => e.stopPropagation()}>{modal}</div>
      <style jsx>
        {`
          .blackBg {
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            background-color: rgba(0, 0, 0, 0.534);
            z-index: 200;
          }
        `}
      </style>
    </div>
  );
}
