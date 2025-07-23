/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { CgSpinnerTwo } from "react-icons/cg";
import { MdOutlineFileUpload } from "react-icons/md";
import { toast } from "sonner";

interface IProps {
  onChange: (fileUrls: string[] | null) => void;
  defaultImages?: string[];
  children?: React.ReactNode;
  inputId?: string;
  labelStyle?: string;
  mode?: "single" | "multiple"; // NEW: single = one image, multiple = many
  title?: string;
}

const ImageDisplay = ({
  preview,
  onRemove,
  onUploaded,
}: {
  preview: string | File;
  onRemove: () => void;
  onUploaded?: (url: string) => void;
}) => {
  const [uploadSingleFile, { isLoading }] = useUploadSingleFileMutation(undefined);
  const hasUploaded = useRef(false);

  useEffect(() => {
    const handleSaveImages = async () => {
      if (typeof preview === "string" || hasUploaded.current) return;

      hasUploaded.current = true;

      try {
        const formData = new FormData();
        formData.append("file", preview);

        const res = await uploadSingleFile(formData);
        const url = res?.data?.data || "";

        onUploaded?.(url);
      } catch {
        toast.error("Something went wrong while uploading your image.");
      }
    };

    handleSaveImages();
  }, []);

  return (
    <div className="center relative h-[80px] w-[80px] shrink-0 rounded-[8px] border-[1px] border-border-muted">
      {(typeof preview === "string" ? preview : preview instanceof File) && (
        <Image
          width={150}
          height={150}
          src={typeof preview === "string" ? preview : URL.createObjectURL(preview)}
          alt="uploaded image"
          className="h-auto max-h-full w-full rounded-lg object-cover shadow-md"
        />
      )}

      {isLoading && (
        <span className="center absolute top-0 left-0 h-full w-full bg-black/40">
          <CgSpinnerTwo className="animate-spin text-3xl text-primary" />
        </span>
      )}

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-1 right-1 z-[2] h-[16px] w-[16px] cursor-pointer rounded-full bg-danger text-xs text-white"
        title="Remove image"
      >
        &times;
      </button>
    </div>
  );
};

const ImageUploader: React.FC<IProps> = ({
  children,
  onChange,
  defaultImages = [],
  inputId,
  labelStyle,
  mode = "multiple", // default to multiple
  title = "Upload Product Image",
}) => {
  const [files, setFiles] = useState<{ file: File; id: string }[]>([]);
  const [savedImages, setSavedImages] = useState<string[]>(defaultImages);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const types = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/jpg"];
    const validFiles = droppedFiles.filter((file) => {
      const isValid = types.includes(file.type);
      const isUnder4MB = file.size <= 4 * 1024 * 1024;
  
      if (!isUnder4MB) {
        toast.error(`"${file.name}" exceeds the 4MB size limit.`);
      }
  
      return isValid && isUnder4MB;
    });

    const newFiles = validFiles.map((file) => ({ file, id: crypto.randomUUID() }));

    if (mode === "single" && newFiles.length > 0) {
      setFiles([newFiles[0]]);
    } else {
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = Array.from(event.target.files || []);
    const validFiles = inputFiles.filter((file) => {
      const isUnder4MB = file.size <= 4 * 1024 * 1024;
  
      if (!isUnder4MB) {
        toast.error(`"${file.name}" exceeds the 4MB size limit.`);
      }
  
      return isUnder4MB;
    });

    const newFiles = validFiles.map((file) => ({ file, id: crypto.randomUUID() }));

    if (mode === "single" && newFiles.length > 0) {
      setFiles([newFiles[0]]);
    } else {
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveSavedImage = (index: number) => {
    const newImages = savedImages.filter((_, i) => i !== index);
    setSavedImages(newImages);
    onChange(newImages);
  };

  return (
    <div className="min-h-[100px] w-full">
      {children || (
        <h3 className="text-[14px] font-[600] text-strong md:text-[16px] lg:text-[20px]">
          {title}
        </h3>
      )}

      <div onDrop={handleDrop} onDragOver={handleDragOver}>
        <label
          htmlFor={inputId || "image-uploader"}
          className={`center mt-[20px] h-[150px] cursor-pointer flex-col border-[2px] border-dashed border-dashboard/50 bg-dashboard/10 md:h-[200px] lg:h-[270px] ${labelStyle}`}
        >
          <MdOutlineFileUpload className="size-7 text-[50px] text-muted md:size-10" />
          <span className="text-[12px] text-dashboard md:text-[18px] md:font-[600]">
            Click to upload or drag and drop
          </span>
          <span className="text-[12px] font-[400] text-muted sm:text-[14px]">
            PNG / JPG / JPEG / GIF / WEBP
          </span>
        </label>
      </div>

      <input
        id={inputId || "image-uploader"}
        multiple={mode === "multiple"}
        type="file"
        className="hidden"
        accept=".png, .jpg, .jpeg, .gif, .webp"
        onChange={handleImageChange}
      />

      <div className="mt-4 flex flex-wrap items-center justify-start gap-4">
        {files.map((file) => (
          <ImageDisplay
            key={file.id}
            preview={file.file}
            onRemove={() => removeFile(file.id)}
            onUploaded={(url) => {
              if (mode === "single") {
                setFiles([]);
                setSavedImages([url]);
                onChange([url]);
              } else {
                removeFile(file.id);
                setSavedImages((prev) => [...prev, url]);
                onChange([...savedImages, url]);
              }
            }}
          />
        ))}
        {savedImages.map((url, index) => (
          <ImageDisplay key={index} preview={url} onRemove={() => handleRemoveSavedImage(index)} />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
