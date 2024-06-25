import './styles.css';

function FilterInput({ className, name, handleSelectFilter }) {
    return (
        <div className={`grid md:grid-cols-5 grid-cols-7 form-input ${className ?? ''}`}>
            <input 
                type="checkbox"
                name={name}
                value={name}
                onChange={handleSelectFilter}
            />
            <label className='md:col-span-3 col-span-5' htmlFor={name}>{name}</label>
            <div className='about-button'>?</div>
        </div>
    );
}

export default FilterInput;
