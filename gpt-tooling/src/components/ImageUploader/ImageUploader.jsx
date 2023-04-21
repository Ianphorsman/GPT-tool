import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

const ImageUploader = ({ onUpload }) => {
  const [previewImage, setPreviewImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleUpload = () => {
    onUpload(previewImage);
    setPreviewImage(null);
  };

  return (
    <div>
      <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <p>Drag and drop an image here, or click to select from your filesystem</p>
      </div>
      {previewImage && (
        <div style={{ marginTop: '20px' }}>
          <Image src={previewImage} alt="Preview" width={200} height={200} />
          <button onClick={handleUpload} style={{ marginTop: '10px' }}>
            Confirm Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader
