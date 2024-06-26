import ImageInput from './ImageInput';
import FilterForm from './FilterForm';
import useUpload from '../../hooks/useUpload';
import useModal from '../../hooks/useModal';
import './styles.css';
import Modal from '../../components/Modal';

function App() {
  const {
    imagePreviewUrl,
    isLoading,
    handleImageChange,
    handleUpload,
    setSelectedFilters,
  } = useUpload();

  const {
    isOpen,
    toggleModal,
    children,
    setChildren
  } = useModal();

  return (
    <div className="App">
      <div className='Main grid md:grid-cols-5 grid-cols-1 h-screen'>
        <ImageInput 
          className='md:col-span-3' 
          handleImageChange={handleImageChange}
          selectedFile={imagePreviewUrl} 
        />
        <FilterForm 
          className='md:col-span-2'
          isLoading={isLoading}
          handleUpload={handleUpload}
          setSelectedFilters={setSelectedFilters}
          toggleModal={toggleModal}
          setChildren={setChildren}
        />
        <Modal isOpen={isOpen} handleClose={toggleModal}>
          {children}
        </Modal>
      </div>
    </div>
  );
}

export default App;
