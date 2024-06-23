import './styles.css';
import { useState } from "react";

function FilterInput({ className, name, handleSelectFilter }) {
    return (
        <div className={`grid grid-cols-5 form-input ${className}`}>
            <input type="checkbox" name={name} value={name} onChange={handleSelectFilter}/>
            <label className='col-span-3' htmlFor={name}>{name}</label>
            <div className='about-button'>?</div>
        </div>
    );
}

export default FilterInput;
