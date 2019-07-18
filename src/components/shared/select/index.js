import React from 'react';
import '../../../styles/select.css';

const SelectComponent = ({ showOptions = false, toggleOptions = () => {}, selectOption = () => {}, optionSelected = 0 }) => {
    return (
        <div className="main-select">
          <a role="button" className={showOptions ? 'col-3 private active' : 'col-3 private'} onClick={toggleOptions}>
            {optionSelected === 1 && 'Público'}
            {optionSelected === 2 && 'Amigos'}
            {optionSelected === 3 && 'Sólo yo'}
          </a>
          <div className={showOptions ? 'private-list-options active' : 'private-list-options'}>
            <ul>
              <li className="" onClick={selectOption.bind(this, 1)}>Publico</li>
              <li className="" onClick={selectOption.bind(this, 2)}>Amigos</li>
              <li className="" onClick={selectOption.bind(this, 3)}>Solo yo</li>
            </ul>            
          </div>
        </div>
    )
}

export default SelectComponent;
