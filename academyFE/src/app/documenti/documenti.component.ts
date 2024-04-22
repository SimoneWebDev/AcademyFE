import { Component, TemplateRef } from '@angular/core';
import { RestService } from '../service/rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-documenti',
  templateUrl: './documenti.component.html',
  styleUrls: ['./documenti.component.scss']
})
export class DocumentiComponent {
 

  listaDocumenti !: any[];
  tipoBase: any = "data:image/*;base64,";

  isModalOpen = false;

  

  constructor(private service : RestService,private modalService: NgbModal){

  }

  ngOnInit(){

    this.service.getAllDocuments().subscribe({
      next:(res : any) => {

        this.listaDocumenti=res
        console.log(this.listaDocumenti);
        
      }
    })

  }
  openAddDocument(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
