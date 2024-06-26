import './styles.css';

function FilterInput({ 
    className, 
    name,
    handleSelectFilter,
    setChildren,
    toggleModal,
 }) {
    const ModalContent = () => {
        return 'a';
    }

    const openModal = () => {
        setChildren(<ModalContent />);
        toggleModal();
    }

    return (
        <div className={`grid md:grid-cols-5 grid-cols-7 form-input ${className ?? ''}`}>
            <input 
                type="checkbox"
                name={name}
                value={name}
                onChange={handleSelectFilter}
            />
            <label className='md:col-span-3 col-span-5' htmlFor={name}>{name}</label>
            <button 
                type='button' 
                onClick={() => openModal()}
                className='about-button'
                >?</button>
        </div>
    );
}

export default FilterInput;
