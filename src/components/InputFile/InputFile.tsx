import React, { useRef } from 'react';
import { toast } from 'react-toastify';

interface InputFileProps {
  onChange?: (file?: File) => void;
}

export default function InputFile({ onChange }: InputFileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target?.files?.[0];

    if (
      (fileFromLocal && fileFromLocal?.size > 1048576) ||
      (fileFromLocal && !fileFromLocal.name.match(/\.(jpg|jpeg|png|gif)$/))
    ) {
      toast.error('Dung lượng tối đa 1MB và định dạng .JPEG, .PNG');
    } else {
      onChange && onChange(fileFromLocal);
    }
  };
  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        onChange={handleFileChange}
        onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => ((event.target as any).value = null)}
      />
      <button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-2 text-sm text-gray-600 shadow-sm'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </>
  );
}
