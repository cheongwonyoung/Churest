import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BiImageAdd } from 'react-icons/bi';

type Props = {
  addFiles(x: File[]): void;
  files: File[];
  deleteImage(f: File): void;
};

export default function ImgUploader({ addFiles, files, deleteImage }: Props) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      if (files.length + acceptedFiles.length > 9) {
        addFiles(acceptedFiles.slice(0, 9 - files.length));
      } else {
        addFiles(acceptedFiles);
      }
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file?.preview));
  }, []);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        {files.length > 0 ? (
          <div className="fileBox">
            {files.length < 9 && (
              <div className="smallImgBox">
                <input {...getInputProps()} />

                <p className="smallImgPic">
                  <BiImageAdd />
                </p>
                <p className="smallImgComment">이미지를 더블클릭하여,</p>
                <p className="smallImgComment">삭제하세요.</p>
              </div>
            )}
            {files.map((file) => {
              return (
                <div
                  className="img"
                  onClick={(e) => e.stopPropagation()}
                  onDoubleClick={() => deleteImage(file)}
                >
                  <Image src={file.preview} width={106} height={106} alt="" />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="imgBox">
            <input {...getInputProps()} />

            <p className="imgPicture">
              <BiImageAdd />
            </p>
            <span className="imgComment">이미지를 선택하거나,</span>
            <span className="imgComment">드래그하세요.</span>
          </div>
        )}
      </div>
      {/* <aside style={thumbsContainer}>{thumbs}</aside> */}
      <style jsx>
        {`
          .imgPicture {
            font-size: 150px;
            color: rgb(214, 201, 136);
          }
          .imgComment {
            color: rgb(214, 201, 136);
          }
          .imgBox {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            box-shadow: inset 0px 0px 20px -3px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            height: 340px;
          }
          .fileBox {
            display: flex;
            box-shadow: inset 0px 0px 20px -3px rgba(0, 0, 0, 0.1);
            height: 340px;
            border-radius: 10px;
            padding: 1px;
            gap: 1px;
            flex-wrap: wrap;
            align-content: flex-start;
          }
          .img {
            border-radius: 10px 10px 10px 10px;
            height: 110px;
            overflow: hidden;
            border: 0.5px rgb(255, 232, 21) solid;
          }
          .smallImgPic {
            font-size: 40px;
            color: rgb(214, 201, 136);
          }
          .smallImgBox {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border: 0.5px rgb(212, 194, 102) solid;
            border-radius: 10px;
          }
          .smallImgComment {
            font-size: 6px;
            color: rgb(212, 194, 102);
          }
        `}
      </style>
    </section>
  );
}
