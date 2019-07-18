import React from 'react';
import '../../styles/main-publications.css';
import PublicationComponent from '../shared/publication';

const PublicationsComponent = ({ publications = [], deletePublication = () => {}, editPublication = () => {} }) => {
  console.log(publications)
  const elements = publications.map((elem, index) => <PublicationComponent publication={elem} deletePublication={deletePublication} position={index} editPublication={editPublication} /> );
  return elements;
}

export default PublicationsComponent;
