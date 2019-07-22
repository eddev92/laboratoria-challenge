import React from 'react';
import '../../../styles/publication.css';

const PublicationComponent = ({ publication, editPublication = () => {}, deletePublication = () => {}, position }) => {
  let  privacity = '';
  switch (publication.privacity) {
    case 1: privacity = 'Publico'
      break;
    case 2: privacity = 'Amigos'
    break;
    case 3: privacity = 'Solo yo'
    break;
    default: privacity = '';
  }
  const publicationAux = { ...publication };

  publicationAux.position = position;
    return (
      <div className="publication-content">
        <span>{privacity}</span>
        <p>
          {publication.message}
        </p>
        <a onClick={editPublication.bind(this, publicationAux)} className="">Editar</a>
        <a onClick={deletePublication.bind(this, publicationAux)} className="">Eliminar</a>
      </div>
      )
}

export default PublicationComponent;
