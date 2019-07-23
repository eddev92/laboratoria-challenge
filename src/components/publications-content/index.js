import React from 'react';
import '../../styles/main-publications.css';
import PublicationComponent from '../shared/publication';

const PublicationsComponent = ({ publications = [], deletePublication = () => {}, editPublication = () => {} }) => {
  const elements = publications.map((value, index) => <PublicationComponent publication={value} deletePublication={deletePublication} position={index} editPublication={editPublication} /> );
 
  return elements;
}

export default PublicationsComponent;
