import React from 'react';
import '../../styles/home.css';
import SelectComponent from '../shared/select';
import PublicationsComponent from '../publications-content';

const HomeComponent = ({ filterPublications = () => {}, logout = () => {}, editActive = false, isValid, showOptions = false, toggleOptions = () => {}, publications = [], selectOption = () => {}, optionSelected = 0, sharePublication = () => {}, handlePublication = () => {}, publication = '', deletePublication = () => {}, editPublication = () => {}, publicationSelected, messageForPublicationSelected, privacityForPublicationSelected, updatePublication = () => {}, cancelUpdatePublication = () => {} }) => {

  return (
    <div className="row main-home">
      {isValid && <a className="logout" onClick={logout}>Cerrar sesión</a>}
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
              <div>
                <div className="row">
                  <div className="col-3 filterButton" onClick={filterPublications.bind(this, 1)}>Público</div>
                  <div className="col-3 filterButton" onClick={filterPublications.bind(this, 2)}>Amigos</div>
                  <div className="col-3 filterButton" onClick={filterPublications.bind(this, 3)}>Sólo yo</div>
                  <div className="col-3 filterButton" onClick={filterPublications.bind(this, 4)}>Todos</div>
                </div>
                <PublicationsComponent publications={publications} deletePublication={deletePublication} editPublication={editPublication} />
              </div>
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
