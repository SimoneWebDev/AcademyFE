import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from '../service/rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { Studente } from '../model/studente';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { concat, of } from 'rxjs';
@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.scss']
})
export class StudentiComponent {

  studenteDettagli !: Studente;

  constructor(private service : RestService,private modalService: NgbModal, private formBuilder: FormBuilder,private router : Router,private sanitizer: DomSanitizer){}

  form = this.formBuilder.group({

    nome: ['', Validators.required],
    cognome: ['', Validators.required],
    email: "",
    titoloDiStudio:"",
    dataDiNascita:null,
    numeroTelefonico: "",
    dataInizioCorso: null,
    dataFineCorso:null,
    progetto:"",
    note:"",
  
  });
  

  cv!: any;
  isDisable = false;
  tipoBase : any="data:application/pdf;base64,"
  safeUrl: SafeResourceUrl | undefined;
  tipoBasePng: any = "data:application/png;base64,";
  listaStudenti : Studente[]= [];
  studente : any ="";
  imgProfiloModel: string | ArrayBuffer | null = null;
  imgProfilo: any ;

  resettaModal() {
    this.imgProfiloModel=null;
    this.imgProfilo=null;
    this.cv=null;
 
    this.form.reset({
      nome: "",
      cognome: "",
      email: "",
      titoloDiStudio:"",
      dataDiNascita: null,
      numeroTelefonico: "",
      dataInizioCorso: null,
      dataFineCorso: null,
      progetto:"",
      note:"",
    });
   

  }

  openAddStudente(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openModifica(studente : any){
  
    studente = JSON.stringify(studente);
    sessionStorage.setItem("studente",studente)
  
    this.router.navigate(['modificaStudente'])
    
 
  }

  openDettagli(dettagli: any,studente : any): void {
    this.studenteDettagli=studente;
    this.safeUrl=this.studenteDettagli.cv
    
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.tipoBase + this.studenteDettagli.cv);
    this.modalService.open(dettagli, { ariaLabelledBy: 'modal-dettagli' });
  }
 
  

  @ViewChild(MatTableDataSource)
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ['immagineProfilo','nome', 'cognome','numeroTelefonico','dataInizioCorso','Cv','Icon'];

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.nome.toLowerCase().includes(filter) ||
             data.cognome.toLowerCase().includes(filter);
    };
  }

  
  LoadStudenti(){
    this.service.getAllStudents().subscribe({
      next: (res: any) => {
  
        this.listaStudenti = res.reverse();
        this.dataSource = new MatTableDataSource(this.listaStudenti);
      }
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.LoadStudenti();
    }, 30); 
  }

  saveStudente(stud : any){
    this.studente = stud;
    localStorage.setItem("studente", JSON.stringify(stud));
    window.open('/academy/studenti/pdfVis', '_blank');
  }
 
 

  caricaCv(event: any) {
   
    this.cv = event.target.files[0];
  }
 

  caricaImg(event: any) {
 this.onFileSelectedImg(event);
 
    const file = event.target.files[0];
    
   
    if (file) {
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgProfiloModel = e.target.result;
        
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelectedImg(event: any) {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      this.imgProfilo = files[0];
      
    }
  }
  

 
 

  inserisciImg() {

    return this.service.addimgProfilo(this.imgProfilo, this.idAppoggio);
  }
  
  inserisciCv() {

    return this.service.addCv(this.cv, this.idAppoggio);
  }
  
  idAppoggio = 0;
  
  submitForm(): void {
    console.log(this.form.value);
    
    if (this.form) {
      this.service.addStudente(this.form.value).subscribe({
        next: (res: any) => {

          console.log("Studente aggiunto con successo. ID:", res.id);

          this.idAppoggio = res.id;
  
          const inserisciImgObservable = this.imgProfilo ? this.inserisciImg() : of(null);
          const inserisciCvObservable = this.cv ? this.inserisciCv() : of(null);
  
          concat(inserisciImgObservable, inserisciCvObservable).subscribe({
            next: (result) => {
              if (result) {
                console.log("Immagine profilo aggiunta con successo");
              } else {
                console.log("CV aggiunto con successo");
              }
  
              this.resettaModal();
              this.modalService.dismissAll();

     
                this.LoadStudenti();
         
            },
            error: (error) => {
              console.error("Errore durante l'aggiunta dell'immagine profilo o del CV:", error);
            }
          });
        },
        error: (error) => {
          console.error("Errore durante l'aggiunta dello studente:", error);
        }
      });
    }
  }
  

  deleteStudent(id : number){

    this.service.deleteStudent(id).subscribe({
      next:(res : any) =>{

        this.LoadStudenti()
      }
    })

  }

}

  
 
