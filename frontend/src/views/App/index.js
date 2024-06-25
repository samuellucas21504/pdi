import ImageInput from '../../components/ImageInput';
import FilterForm from '../../components/FilterForm';
import useUpload from '../../hooks/useUpload';
import './styles.css';

function App() {
  const {
    imagePreviewUrl,
    isLoading,
    handleImageChange,
    handleUpload,
    setSelectedFilters,
  } = useUpload();

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
        />
      </div>
    </div>
  );
}

export default App;
