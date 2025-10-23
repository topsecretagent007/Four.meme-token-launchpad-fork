import UserContext from '@/context/UserContext';
import { userInfo } from '@/utils/types';
import { updateUser, walletConnect } from '@/utils/util';
import { uploadImage } from '@/utils/fileUpload';
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { errorAlert, successAlert } from '../others/ToastGroup';
import UserImg from '@/../public/assets/images/user-avatar.png';
import Image from 'next/image';
import Spinner from '../loadings/Spinner';

interface ModalProps {
  data: userInfo;
}

const Modal: React.FC<ModalProps> = ({ data }) => {
  const { setProfileEditModal, setUser, user, isLoading, setIsLoading } = useContext(UserContext);
  const [index, setIndex] = useState<userInfo>(data);
  const [imagePreview, setImagePreview] = useState<string | null>(data.avatar || null);
  const [fileName, setFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIndex({ ...index, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    console.log("uploadedUrl1 ==>", data)
  }, [data])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
      const url = URL.createObjectURL(file);
      let _fileName = file.name.length > 18
        ? `${file.name.slice(0, 6)}...${file.name.slice(-6)}`
        : file.name;

      setFileName(_fileName || ''); // Ensure it's always a string
      console.log("url ==>", url)
      setImagePreview(url); // URL.createObjectURL always returns a string
    }
  };

  const sendUpdate = async () => {
    setProfileEditModal(false)
    setIsLoading(true)
    try {
      let uploadedUrl: string = index.avatar || ''; // Ensure it starts as a string
      console.log("imagePreview ==>", imagePreview)

      if (imagePreview && imagePreview !== index.avatar) {
        console.log("imagePreview1 ==>", imagePreview)
        const uploadResult = await uploadImage(imagePreview);
        console.log("imagePreview2 ==>", uploadResult)
        uploadedUrl = uploadResult || ''; // If uploadImage returns false, fallback to an empty string
      }

      console.log("uploadedUrl ==>", uploadedUrl)
      const updatedUser = {
        ...index,
        avatar: uploadedUrl,
      };

      console.log("updatedUser ==>", updatedUser)


      const connection = await walletConnect({ data: updatedUser });

      const result = await updateUser(updatedUser._id, updatedUser);

      if (result.error) {
        errorAlert('Failed to save the data.');
      } else {
        successAlert('Successfully updated.');
        setUser(updatedUser);
        setProfileEditModal(false);
      }
      setIsLoading(false)
    } catch (error) {
      errorAlert('An error occurred while updating your profile.');
      setIsLoading(false)
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <div className="z-40 fixed inset-0 flex justify-center items-center backdrop-blur-md w-full">
        <div className="relative flex flex-col gap-3 bg-[#090B1A] shadow-[#f52a6d] shadow-[0px_8px_8px_0px] p-6 border-[#f52a6d] border-[1px] rounded-md w-full max-w-[300px] sm:max-w-xl text-[#f52a6d]">
          <button
            onClick={() => setProfileEditModal(false)}
            className="top-2 right-2 absolute text-[#f52a6d]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="font-bold text-2xl text-center">Edit Profile</h2>
          <div className="flex flex-col w-full">
            <label className="block font-medium text-white text-lg" htmlFor="name">
              Username:
            </label>
            <input
              className="bg-transparent p-2 border-[#f52a6d] border-[1px] rounded-lg outline-none w-full"
              type="text"
              id="name"
              value={index.name || ''}
              onChange={handleChange}
            />
          </div>

          <div className="flex md:flex-row flex-col justify-between gap-3 md:pr-6 w-full">
            <div>
              <label
                htmlFor="fileUpload"
                className="block mb-2 font-medium text-white text-lg"
              >
                Upload Image:
              </label>
              <label
                htmlFor="fileUpload"
                className="flex bg-transparent hover:bg-white/30 mx-auto p-2 border-[#f52a6d] border-[1px] hover:border-white rounded-lg outline-none w-full max-w-[180px] text-[#f52a6d] hover:text-white text-center transition cursor-pointer"
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

            {(imagePreview !== "https://scarlet-extra-cat-880.mypinata.cloud/" && imagePreview !== "" && imagePreview !== undefined && imagePreview !== null && imagePreview) ? (
              <div className="justify-center mx-auto border-[#f52a6d] border-[1px] rounded-lg w-48 h-48 overflow-hidden">
                <Image
                  src={imagePreview as string} // Ensure it's a string
                  alt="Selected Preview"
                  width={192}
                  height={192}
                  className="flex mx-auto w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="p-3 border-[#f52a6d] border-[1px] rounded-lg w-48 h-48 overflow-hidden">
                <Image
                  src={UserImg}
                  alt="Default Avatar"
                  width={192}
                  height={192}
                  className="flex mx-auto rounded-full w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-around">
            <button
              className="bg-custom-gradient mt-2 px-4 py-2 rounded-md text-white"
              onClick={sendUpdate}
            >
              Save
            </button>
            <button
              className="bg-custom-gradient mt-2 px-4 py-2 rounded-md text-white"
              onClick={() => setProfileEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
