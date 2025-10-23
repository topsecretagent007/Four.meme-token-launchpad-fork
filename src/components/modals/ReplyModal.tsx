import UserContext from '@/context/UserContext';
import { coinInfo, replyInfo } from '@/utils/types';
import { postReply } from '@/utils/util';
import { uploadImage } from '@/utils/fileUpload';
import { ImUpload } from "react-icons/im";
import React, { ChangeEvent, useContext, useRef, useState } from 'react';
import { errorAlert, successAlert, warningAlert } from '../others/ToastGroup';
import Spinner from '../loadings/Spinner';
import Image from 'next/image';

interface ModalProps {
  data: coinInfo;
}

const ReplyModal: React.FC<ModalProps> = ({ data }) => {
  const { postReplyModal, setPostReplyModal, user, isLoading, setIsLoading } = useContext(UserContext);
  const [fileName, setFileName] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const replyPost = async () => {
    if (user.wallet === undefined || user.wallet === null || user.wallet === "") {
      warningAlert("Connect your wallet!")
      return
    }

    try {
      handleModalToggle();
      setIsLoading(true)
      let reply: replyInfo;
      if (imageUrl) {
        const url = await uploadImage(imageUrl);
        console.log("url: ==> ", url)
        console.log("user._id: ==> ", user._id)
        if (url && user._id) {
          reply = {
            coinId: data._id,
            sender: user._id,
            msg: msg,
            img: url
          }
        }
      } else {
        if (user._id) {
          reply = {
            coinId: data._id,
            sender: user._id,
            msg: msg,
          }
        }
      }
      console.log("reply text ==> ", reply)
      await postReply(reply);
      setIsLoading(false)
    } catch (err: any) {
      errorAlert(err)
      setIsLoading(false)
    }
  }

  const handleModalToggle = () => {
    setPostReplyModal(!postReplyModal);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        successAlert('Please select a valid image file.');
        return;
      }
      const url = URL.createObjectURL(file);
      let _fileName = file.name.length > 18
        ? `${file.name.slice(0, 6)}...${file.name.slice(-6)}`
        : file.name;

      setFileName(_fileName || '');
      setImageUrl(url); // URL.createObjectURL always returns a string
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className='z-40 fixed inset-0 flex justify-center items-center backdrop-blur-md w-full'>
        <div className="relative flex flex-col gap-3 bg-[#090B1A] shadow-[0px_8px_8px_0px] shadow-main_color p-6 border-[1px] border-main_color rounded-md w-full max-w-[300px] sm:max-w-xl text-text_color">
          <h2 className="font-bold text-2xl text-center">Post Reply</h2>
          <div className="flex flex-col px-2 w-full">
            <label
              htmlFor="COMMIT  py-[20px]"
              className="block mb-2 font-medium text-text_color text-sm"
            >
              Commit :
            </label>
            <textarea
              id="msg"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              className="bg-transparent p-2.5 border-[1px] border-main_color rounded-lg outline-none w-full min-h-[140px]"
              placeholder="Add commit ..."
              required
            />
          </div>

          <div className="flex md:flex-row flex-col justify-between gap-3 md:pr-6 w-full">
            <div>
              <label
                htmlFor="fileUpload"
                className="block mb-2 font-medium text-text_color text-sm"
              >
                Upload Image:
              </label>
              <label
                htmlFor="fileUpload"
                className="flex bg-main_color/10 hover:bg-main_color/30 mx-auto p-2 border-[1px] border-main_color rounded-lg outline-none w-full text-text_color text-center transition cursor-pointer"
              >
                {fileName || 'Choose an Image'}
              </label>
              <input
                id="fileUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>

            {imageUrl ? (
              <div className="justify-center p-3 border-[1px] border-main_color rounded-lg w-48 h-48 overflow-hidden">
                <Image
                  src={imageUrl as string} // Ensure it's a string
                  alt="Selected Preview"
                  width={192}
                  height={192}
                  className="flex mx-auto rounded-lg w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center p-3 border-[1px] border-main_color rounded-lg w-48 h-48 overflow-hidden">
                <ImUpload className='flex flex-col mx-auto text-9xl' />
              </div>
            )}
          </div>
          <div className="flex justify-around p-3">
            <button onClick={replyPost} className="bg-main_color/10 hover:bg-main_color/30 mt-2 px-4 py-2 border-[1px] border-main_color rounded-md text-white cursor-pointer">POST</button>
            <button onClick={handleModalToggle} className="bg-main_color/10 hover:bg-main_color/30 mt-2 px-4 py-2 border-[1px] border-main_color rounded-md text-white cursor-pointer">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplyModal;
