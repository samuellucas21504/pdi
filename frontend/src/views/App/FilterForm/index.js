import FilterInput from '../FilterInput';
import './styles.css';
import { useState } from "react";
import { filters } from '../../../assets/filters';
import Dropdown from '../DropDown';
import Button from '../../../components/Button';

function FilterForm({ 
    className,
    handleUpload,
    isLoading,
    setSelectedFilters,
    setChildren,
    toggleModal
 }) {
    const [, setSize] = useState({width: 0, height: 0});

    const handleWidthChange = (e) => {
        setSize((prevSize) => {
            prevSize = {...prevSize, width: Number(e.target.value)}
            setSelectedFilters(prevFilters => prevFilters = {
                ...prevFilters, 
                "redimensionamento": prevSize,
            });
            return prevSize;
        });
        
    } 

    const handleHeightChange = (e) => {
        setSize(prevSize => {
            prevSize = {...prevSize, height: Number(e.target.value)};
            setSelectedFilters(prevFilters => prevFilters =  {
                ...prevFilters,
                "redimensionamento": prevSize,
            });

            return prevSize
        });
        
    }
    
    const handleSelectFilter = (key) => {
        setSelectedFilters(prevFilters => {
            const newFilters = { ...prevFilters };

            if (key in newFilters) {
            newFilters[key] = !newFilters[key];
            } else {
            newFilters[key] = true;
            }

            console.log(newFilters[key]);

            return newFilters;
        });
    }

    function generateFormList(node) {
        return Object.keys(node).map((key) => {
            const child = node[key];
            const _k = child.key ?? key;

            if (Array.isArray(child)) {
                return (
                    <Dropdown key={_k} title={key}>
                        {generateFormList(child)}
                    </Dropdown>
                );
            } else {
                return (    
                    <FilterInput
                        key={_k}
                        name={child.name}
                        handleSelectFilter={() => handleSelectFilter(_k)}
                        setChildren={setChildren}
                        toggleModal={toggleModal}
                    />
                );
            }
        });
    }
    

    return (
        <div className={`${className} md:p-12 p-4 Form`}>
            {generateFormList(filters)}
            <div className={`grid form-input`}>
                <div className='grid grid-cols-7'>
                    <div className='grid col-span-5 grid-rows-2'>
                        <label>Redimensionar</label>
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
                </div>
            </div>
            <Button onClick={() => handleUpload()} disabled={isLoading}>
                Enviar
            </Button>
            
        </div>
    );
}

export default FilterForm;
