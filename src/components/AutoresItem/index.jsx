import React from 'react';
import './styles.css';
import { FaArrowRight } from 'react-icons/fa';

const AutoresItem = ({ name, onClick }) => {
  return (
    <div className="autores-item" onClick={onClick}>
      <span className="autores-name">{name}</span>
      <FaArrowRight className="arrow-go-icon" />
    </div>
  );
};

export default AutoresItem;
