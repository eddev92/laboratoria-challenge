import React from 'react';
import '../../styles/home.css';
import SpinnerComponent from '../shared/spinner';
import PublicationsComponent from '../publications-content';

const HomeComponent = ({ isValid }) => {
  return (
    <div className="row main-home">
      <div className={(isValid) ? 'main-dashboard input col-6 isLoged' : 'main-dashboard input col-6'}>        
        <div className="input-publication">
            <div className="title">
              <span>Crear publicacion</span>
            </div>
            <input />
            <div className="footer">

            </div>
        </div>
      </div>
        <div className={(isValid) ? 'main-dashboard col-6 isLoged' : 'main-dashboard col-6'} > 
            {(isValid) 
            &&
              <PublicationsComponent />
            }
        </div>
    </div>
)
}

export default HomeComponent;
