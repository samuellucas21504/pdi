import FilterInput from '../FilterInput';
import './styles.css';
import { useState } from "react";
import { filters } from '../../assets/filters';
import Spinner from '../Spinner';

function FilterForm({ className, handleUpload, isLoading }) {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [size, setSize] = useState({width: 0, height: 0});

    const handleWidthChange = (e) => {
        setSize((prevSize) => {
            prevSize = {...prevSize, width: Number(e.target.value)}
            setSelectedFilters(prevFilters => prevFilters = {...prevFilters, "redimensionamento": prevSize });
            return prevSize;
        });
        
    } 

    const handleHeightChange = (e) => {
        setSize(prevSize => {
            prevSize = {...prevSize, height: Number(e.target.value)};
            setSelectedFilters(prevFilters => prevFilters =  {...prevFilters, "redimensionamento": prevSize });

            return prevSize
        });
        
    }
    

    const handleSelectFilter = (key) => {
        setSelectedFilters(prevFilters => {
            if(key in prevFilters) {
                delete prevFilters[key];
            } else {
                prevFilters[`${key}`] = true;
            }

            return prevFilters;
        });
    }

    
    return (
        <div className={`${className} md:p-12 p-4 Form`}>
            {filters.map((filter) => 
                <FilterInput
                    key={filter.key}
                    name={filter.name}
                    handleSelectFilter={() => handleSelectFilter(filter.key)}
                />
                )
            }
            <div className={`grid grid-rows-2 form-input gap-2 pb-4 ${className}`}>
                <div className='grid grid-cols-7'>
                    <label className='col-span-5' >Redimensionar</label>
                    <div className='col-span-2 about-button'>?</div>
                </div>
                <div className='resize-inputs grid grid-cols-2 gap-4'>
                    <input 
                        type="number"
                        name="width"
                        alt='width' 
                        placeholder='width' 
                        onChange={(e) => handleWidthChange(e)}
                    />
                    <input 
                        type="number" 
                        name="height" 
                        alt='height' 
                        placeholder='height'
                        onChange={(e) => handleHeightChange(e)}
                    />
                </div>
            </div>
            <button onClick={() => handleUpload(selectedFilters)} className='submit-button' disabled={isLoading}>
                { isLoading ?  <Spinner/> : 'Enviar'} 
            </button>
        </div>
    );
}

export default FilterForm;
