import { useState } from 'react';
import axios from 'axios';

const useUpload = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (file) => {
    if(file === null) {
     setSelectedFile(null);
     setImagePreviewUrl(null);   
    }
    else if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor selecione uma imagem antes!');
      return;
    }

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1];
      const data = {
        filename: selectedFile.name,
        content: base64String,
        filters: {...selectedFilters},
      };
      console.log(data);

      try {
        await axios.post('http://localhost:8000/', data, {
          headers: {
            'Content-Type': 'application/json',
            responseType: 'blob',
          },
        }).then((response => {
          if (response.status === 200) {
            setImagePreviewUrl(`data:image/png;base64,${response.data.content}`);
          } else {
            setError('Image upload failed');
          }
        }));

        
      } catch (err) {
        console.error('Error uploading image:', err);
        setError('An error occurred while uploading the image');
      } finally {
        setIsLoading(false);
      }

      return;
    };

    reader.readAsDataURL(selectedFile);
    return;
  };

  return {
    imagePreviewUrl,
    isLoading,
    error,
    handleImageChange,
    handleUpload,
    setSelectedFilters
  };
};

export default useUpload;
