import ImageInput from './ImageInput';
import FilterForm from './FilterForm';
import useUpload from '../../hooks/useUpload';
import useModal from '../../hooks/useModal';
import './styles.css';
import Modal from '../../components/Modal';
import { Footer } from './Footer';

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
      <div className='Main grid lg:grid-cols-4 grid-cols-1 h-screen'>
        <ImageInput 
          className='lg:col-span-3 col-span-0' 
          handleImageChange={handleImageChange}
          selectedFile={imagePreviewUrl} 
        />
        <FilterForm 
          isLoading={isLoading}
          handleUpload={handleUpload}
          setSelectedFilters={setSelectedFilters}
          toggleModal={toggleModal}
          setChildren={setChildren}
        />
      </div>
      <Modal isOpen={isOpen} handleClose={toggleModal}>
          {children}
        </Modal>
      <Footer />

    </div>
  );
}

export default App;
