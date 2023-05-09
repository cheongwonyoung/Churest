import { ReactComponentElement, ReactNode } from 'react';

type Props = {
  closeModal?(): void;
  modal?: ReactNode;
};

export default function ModalBlackBg({ closeModal, modal }: Props) {
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
            z-index: 150;
          }
        `}
      </style>
    </div>
  );
}
