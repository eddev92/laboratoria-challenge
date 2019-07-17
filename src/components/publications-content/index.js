import React from 'react';
import '../../styles/main-publications.css';
import PublicationComponent from '../shared/publication';

const PublicationsComponent = ({ publications = [], deletePublication = () => {} }) => {
  const elements = publications.map((elem, index) =>  <PublicationComponent publication={elem} deletePublication={deletePublication} position={index} /> );
  return elements;
}

export default PublicationsComponent;
