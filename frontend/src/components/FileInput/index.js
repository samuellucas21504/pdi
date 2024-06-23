import './styles.css';
import { useRef } from "react";

function FileInput({ className, selectedFile, setSelectedFile }) {
    const inputRef = useRef();

    const handleOnChange = (event) => {
        if(event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onloadend = () => setSelectedFile(reader.result);
                reader.readAsDataURL(file);
            }
        }
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }
    
    if(selectedFile != null) {
        return <div className={`${className} image-section`}>
            <div className='absolute top-20 left-20 close-button p-2'>
                <button onClick={() => setSelectedFile(null)} >
                    Remover
                </button>
            </div>
            <img src={selectedFile} alt='Sua Imagem' />
        </div>
    }

    return (
        <div className={className}>
            <input type="file" ref={inputRef} onChange={handleOnChange} className="hidden" />
            
            <button className="file-btn" onClick={onChooseFile}>
                Adicionar Imagem
            </button>
        </div>
    );
}

export default FileInput;