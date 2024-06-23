import FileInput from '../../components/FileInput';
import FilterForm from '../../components/FilterForm';
import './styles.css';

import { useState } from 'react';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleSubmit = (filters) => {
    const postObj = {
      filters: {
        ...filters
      },
      selectedFile,
    };

    console.log(postObj);
  } 

  return (
    <div className="App">
      <div className='Main grid grid-cols-5 p-12 h-screen'>
        <FileInput 
          className='col-span-3' 
          selectedFile={selectedFile} 
          setSelectedFile={setSelectedFile}
        />
        <FilterForm 
          className='col-span-2'
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
