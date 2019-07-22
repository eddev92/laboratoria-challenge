class LaboratoriaServices {
  constructor(ref) {
    this.ref = ref;
  }
	deletePublicationDB = (publication) => {
		const publicationsRef = this.ref.child("publications");
		return publicationsRef.child(publication.id).remove();
  }
  
	updatePublicationDB = (id, newPublication) => {
		const publicationsRef = this.ref.child("publications");

		return publicationsRef.child(id).child('publication').update(newPublication);
  }
  
  savePublication = (publication) => {
		const publicationsRef = this.ref.child("publications");
		return publicationsRef.push({publication});
	}
}

export default LaboratoriaServices;
