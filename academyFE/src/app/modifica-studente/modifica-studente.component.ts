import { Component } from '@angular/core';
 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../service/rest.service';
import { Router } from '@angular/router';
import { concat, of } from 'rxjs';

@Component({
  selector: 'app-modifica-studente',
  templateUrl: './modifica-studente.component.html',
  styleUrls: ['./modifica-studente.component.scss']
})
export class ModificaStudenteComponent {



  tipoBasePng: any = "data:application/png;base64,";
 

  caricaCv(event: any) {
   
    this.studenteModificareForm.cv = event.target.files[0];
  }
 

  selectedFile!: File  ;

  caricaImg(event:any) {
    this.onFileSelectedImg(event)
    this.selectedFile = event.target.files[0];
  
    var reader = new FileReader();
    reader.onload = (event: any) => {
    
      let base64Result = event.target.result.split(',')[1];
      
      this.studente.immagineProfilo = base64Result;
     
    }
    reader.readAsDataURL(this.selectedFile);
}


onFileSelectedImg(event: any) {
  const files: FileList = event.target.files;
  if (files && files.length > 0) {
    this.studenteModificareForm.immagineProfilo = files[0];
    
  }
}
 
  studente: any; 
  studenteModificareForm!: any ;  

  constructor(private fb: FormBuilder,private service : RestService, private router : Router) { }  

  ngOnInit() {
    this.studente = sessionStorage.getItem("studente");
    this.studente = JSON.parse(this.studente);
 
    this.studenteModificareForm = this.fb.group({

      immagineProfilo: [this.studente.immagineProfilo],
      nome: [this.studente.nome, Validators.required],
      cognome: [this.studente.cognome, Validators.required],
      email: this.studente.email,
      titoloDiStudio: this.studente.titoloDiStudio,
      dataDiNascita: this.studente.dataDiNascita,
      numeroTelefonico: this.studente.numeroTelefonico,
      dataInizioCorso: this.studente.dataInizioCorso,
      dataFineCorso: this.studente.dataFineCorso,
      progetto: this.studente.progetto,
      note: this.studente.note,
      cv: this.studente.cv
    });

   
 console.log(this.studente);
 console.log(this.studenteModificareForm);
 
 
  }
  inserisciImg() {
    return this.service.addimgProfilo(this.studenteModificareForm.immagineProfilo, this.studente.id);
}

inserisciCv() {
    return this.service.addCv(this.studenteModificareForm.cv, this.studente.id);
}

modificaStudente() {
  
  
    this.service.editStudent(this.studenteModificareForm.value, this.studente.id).subscribe({
        next: (res: any) => {
            const inserisciImgObservable = this.studenteModificareForm.immagineProfilo ? this.inserisciImg() : of(null);
            const inserisciCvObservable = this.studenteModificareForm.cv ? this.inserisciCv() : of(null);

            concat(inserisciImgObservable, inserisciCvObservable).subscribe({
                next: (result) => {
                    if (result) {
                        console.log("Immagine profilo aggiunta con successo");
                    } else {
                        console.log("CV aggiunto con successo");
                    }
                }
            });
            
            this.router.navigate(['/academy/studenti']);
        }
    });
}

}