import { Component } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
@Component({
  selector: "app-pdf-vis",
  templateUrl: "./pdf-vis.component.html",
  styleUrls: ["./pdf-vis.component.scss"],
})
export class PdfVisComponent {
 
  studente: any = "";
  tipoBase: any = "data:application/pdf;base64,";
  safeUrl: SafeResourceUrl | undefined;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
  
    let storedStudente = localStorage.getItem("studente");
    if (storedStudente) {
      try {
        this.studente = JSON.parse(storedStudente);
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.tipoBase + this.studente.cv
        );
        console.log(this.studente);
      } catch (e) {
        console.error("Errore local studente", e);
      }
    } else {
      console.log("Nessun utente in locale");
    }
   
  }
}
