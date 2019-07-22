import React from 'react';
import '../../styles/home.css';
import SelectComponent from '../shared/select';
import PublicationsComponent from '../publications-content';

const HomeComponent = ({ editActive = false, isValid, showOptions = false, toggleOptions = () => {}, publications = [], selectOption = () => {}, optionSelected = 0, sharePublication = () => {}, handlePublication = () => {}, publication = '', deletePublication = () => {}, editPublication = () => {}, publicationSelected, messageForPublicationSelected, privacityForPublicationSelected, updatePublication = () => {}, cancelUpdatePublication = () => {} }) => {

  return (
    <div className="row main-home">
      <div className={(isValid) ? 'main-dashboard input col-6 isLoged' : 'main-dashboard input col-6'}>        
        <div className="input-publication">
            <div className="title">
              <span>{`${editActive ? 'Editar' : 'Crear'} publicación`}</span>
            </div>
            <input value={messageForPublicationSelected} onChange={handlePublication} className={publicationSelected && editActive ? 'publicationSelected' : 'publicationDiselected'} />
            <div className="footer row">
              {editActive && <a onClick={cancelUpdatePublication}>Cancelar</a>}
              <SelectComponent showOptions={showOptions} toggleOptions={toggleOptions} selectOption={selectOption} optionSelected={optionSelected} />
              <button 
                className="col-3 shared"
                  onClick={editActive ? updatePublication : sharePublication}
                  >{editActive ? 'Actualizar' : 'Compartir'}</button>
            </div>
        </div>
      </div>
        <div className={(isValid) ? 'main-dashboard col-6 isLoged all-publications' : 'main-dashboard all-publications col-6'}> 
            {(isValid && publications && publications.length > 0) 
              ?
              <PublicationsComponent publications={publications} deletePublication={deletePublication} editPublication={editPublication} />
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
