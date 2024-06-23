import FilterInput from '../FilterInput';
import './styles.css';
import { useState } from "react";
import { filters } from '../../assets/filters';
import Spinner from '../Spinner';

function FilterForm({ className, handleSubmit, isLoading }) {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleSelectFilter = (key) => {
        setSelectedFilters(prevFilters => {
            if(key in prevFilters) {
                delete prevFilters[key];
            } else {
                prevFilters[key] = true;
            }

            return prevFilters;
        });
        console.log(selectedFilters);
    }
    
    return (
        <div className={`Form ${className} p-12`}>
            {filters.map((filter) => 
                <FilterInput
                    key={filter.key}
                    name={filter.name}
                    handleSelectFilter={() => handleSelectFilter(filter.key)}
                />
                )
            }
            <button onClick={() => handleSubmit(selectedFilters)} className='submit-button' disabled={!isLoading}>
                { !isLoading ?  <Spinner/> : 'Enviar'} 
            </button>
        </div>
    );
}

export default FilterForm;
