import React from 'react';
import '../../../styles/publication.css';

const PublicationComponent = ({ publication, editPublication = () => {}, deletePublication = () => {}, position }) => {
  const publicationAux = { ...publication };
  publicationAux.position = position;
  console.log(publicationAux)
    return (
      <div className="publication-content">
        <p>
          {publication.message}
        </p>
        <a onClick={editPublication}>Editar</a>
        <a onClick={deletePublication.bind(this, publicationAux)}>Eliminar</a>
        {/* {`privacidad de tipo ${publication.privacity}`} */}
      </div>
      )
}

export default PublicationComponent;
