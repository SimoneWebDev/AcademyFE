import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http : HttpClient) { }

  getAllStudents(){

    return this.http.get("http://localhost:8080/api/studente/visualizzaTuttiStudenti")

  }

  addStudente(studente : any){

    return this.http.post("http://localhost:8080/api/studente/inserisciStudente",studente)

  }

  addCv(cv : File, id : any) {
    const formData = new FormData();
    formData.append('cv', cv);
  
    let params = new HttpParams();
    params = params.append('id', id);
  
    return this.http.patch("http://localhost:8080/api/studente/inserisciCv", formData, { params });
  }
  
  addimgProfilo(imgProfilo : File, id : any) {
    const formData = new FormData();
    formData.append('imgP', imgProfilo);
  
    let params = new HttpParams();
    params = params.append('id', id);
  
    return this.http.patch("http://localhost:8080/api/studente/inserisciImmagineProfilo", formData, { params });
  }


  deleteStudent(id : number){

    return this.http.delete(`http://localhost:8080/api/studente/eliminaStudente?id=${id}`)

  }
  
  editStudent(studente : any,id : number){

    return this.http.put(`http://localhost:8080/api/studente/modificaStudente?id=${id}`,studente)

  }

  getAllDocuments(){

    return this.http.get("http://localhost:8080/api/documento/getAllDocuments")

  }

}
