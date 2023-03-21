import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collage-home',
  templateUrl: './collage-home.component.html',
  styleUrls: ['./collage-home.component.css']
})





export class CollageHomeComponent implements OnInit {

  imgUrls:string[] = [
    "../../../assets/collage/01-biblio2ST.jpg",
    "../../../assets/collage/02-mesaMH.jpg",
    "../../../assets/collage/03-camastro-mesaST.jpg",
    "../../../assets/collage/04-escritorioMH.jpg",
    "../../../assets/collage/05-escritorio-sillaST.jpg",
    "../../../assets/collage/06-escritorio2MH.jpg",
    "../../../assets/collage/07-silloCuero-percheroST.jpg",
    "../../../assets/collage/08-silloncitoST.jpg",
    "../../../assets/collage/09-mesaST.jpg",
    "../../../assets/collage/10-percheroST.jpg",
    "../../../assets/collage/11-silla-escritorioST.jpg",
    "../../../assets/collage/12-mesa3MH.jpg"
  ];

  imgUrlsGrupo1:string[] = this.imgUrls.filter((elem, ix) => ix < 4);
  imgUrlsGrupo2:string[] = this.imgUrls.filter((elem, ix) => ix >= 4 && ix < 8);
  imgUrlsGrupo3:string[] = this.imgUrls.filter((elem, ix) => ix >= 8 && ix < 12);


  showModal(eventTarget:any, collageModalImg:any, collageModal:any) {
    console.log("event target: ", eventTarget)
      collageModalImg.src = eventTarget.src;
      collageModal.dataset.show = 'true';
  }

  closeModal(collageModal:any) {
      collageModal.dataset.show = 'false';
  }

  ngOnInit(): void {

  }

}


