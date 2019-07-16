import React from 'react';
import '../../styles/home.css';
import SelectComponent from '../shared/select';
import PublicationsComponent from '../publications-content';

const HomeComponent = ({ isValid, showOptions = false, toggleOptions = () => {}, publications = [], selectOption = () => {} }) => {
  return (
    <div className="row main-home">
      <div className={(isValid) ? 'main-dashboard input col-6 isLoged' : 'main-dashboard input col-6'}>        
        <div className="input-publication">
            <div className="title">
              <span>Crear publicacion</span>
            </div>
            <input />
            <div className="footer row">
              <SelectComponent showOptions={showOptions} toggleOptions={toggleOptions} selectOption={selectOption} />
              <button className="col-3 shared">Compartir</button>
            </div>
        </div>
      </div>
        <div className={(isValid) ? 'main-dashboard col-6 isLoged' : 'main-dashboard col-6'} > 
            {(isValid && publications && publications.length > 0) 
              ?
              <PublicationsComponent />
              :
              <div className='main-content'>
                <div className="empty-comments">
                  <h3>NO EXISTEN PUBLICACIONES</h3>
                </div>
              </div>
            }
        </div>
    </div>
)
}

export default HomeComponent;
