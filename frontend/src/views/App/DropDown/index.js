import React, { useState, useRef } from 'react';
import { StringUtils } from '../../../utils/StringUtils.js';
import './styles.css';

export const Dropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {StringUtils.formTitleFormat(title)}
        <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
      </div>
      <div className={`${!isOpen && 'hidden' } dropdown-list`}>
      {children}
      </div>
    </div>
  );
};

export default Dropdown;
