"use client"
import React, { ChangeEvent, useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";

interface ImageUploadProps {
  header: string;
  setFilePreview: (filePreview: string | null) => void;
  type: string;
  setFileUrl: (fileUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ header, setFilePreview, setFileUrl, type }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("No file selected");
  const [imagePreview, setImagePreview] = useState<string | null>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("file ===>", file)
      setSelectedFileName(file.name);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setFilePreview(URL.createObjectURL(file)); // Pass the file name or URL to the parent
      setFileUrl(URL.createObjectURL(file))
    } else {
      setSelectedFileName("No file selected");
      setFilePreview(null);
      setFileUrl(null)
    }
  };

  return (
    <div className="flex flex-col justify-between w-full">
      <label className="flex flex-row gap-1 font-semibold text-text_color text-lg">{header}<p className="text-red-600">*</p></label>
      <input
        type="file"
        accept={type}
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex flex-col justify-between items-start gap-2 p-3 border-[1px] border-main_color rounded-lg w-full">
        {(imagePreview !== "https://scarlet-extra-cat-880.mypinata.cloud/" && imagePreview !== "" && imagePreview !== undefined && imagePreview !== null && imagePreview) ? (
          <div onClick={() => fileInputRef.current?.click()} className="justify-center mx-auto rounded-lg w-full h-48 overflow-hidden cursor-pointer">
            <img
              src={imagePreview as string} // Ensure it's a string
              alt="Selected Preview"
              className="flex mx-auto rounded-lg h-48 object-cover overflow-hidden"
            />
          </div>
        ) : (
          <div onClick={() => fileInputRef.current?.click()} className="flex flex-col justify-center items-center p-3 border-[1px] border-main_color border-dashed rounded-lg w-full h-48 overflow-hidden text-white cursor-pointer">
            <LuImagePlus className="text-main_color text-7xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;