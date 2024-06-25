import './styles.css';
import { useRef } from "react";

function ImageInput({ className, selectedFile, handleImageChange }) {
    const inputRef = useRef();

    const handleOnChange = (event) => {
        if(event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            handleImageChange(file);
        }
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }

    const handleDownload = () => {
        if (selectedFile) {
          const link = document.createElement('a');
          link.href = selectedFile;
          link.download = 'imagem_processada.png'; // You can change the file name here
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
    
    if(selectedFile != null) {
        return <div className={`${className} image-section`}>
            <div className='absolute md:top-4 md:left-4 top-2 left-2 flex md:flex-col md:space-y-4 md:space-x-0 space-x-2'>
                <button onClick={handleDownload} className='download-button md:p-2 p-1 m-auto'>
                    Baixar Imagem
                </button>
                <button onClick={() => handleImageChange(null)} className='close-button md:p-2 p-1 m-auto' >
                    Remover
                </button>
            </div>
            <img src={selectedFile} alt='Sua Imagem' />
        </div>
    }

    return (
        <div className={className}>
            <input 
                type="file" 
                ref={inputRef} 
                onChange={handleOnChange} 
                className="hidden" 
                accept="image/png, image/jpeg"/>
            
            <button className="file-btn" onClick={onChooseFile}>
                Adicionar Imagem
            </button>
        </div>
    );
}

export default ImageInput;