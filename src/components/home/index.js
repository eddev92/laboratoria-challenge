import React from 'react';
import '../../styles/home.css';
import SpinnerComponent from '../shared/spinner';

const HomeComponent = ({ isValid }) => {
  return (
    <div className="row">
        <div className={(isValid) ? 'main-dashboard col-10 isLoged' : 'main-dashboard col-10'} > 
            {(isValid) 
            ?
            <h4>Bienvenido!!!</h4>
            :
            <div className="empty">
                <span>
                    La información se está cargado, espere un momento por favor.
                </span>
                <SpinnerComponent />
            </div>
            }
        </div>
    </div>
)
}

export default HomeComponent;
