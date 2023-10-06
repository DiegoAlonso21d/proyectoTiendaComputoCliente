import { Component } from '@angular/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {
  currentSlide: number = 0;
  imageUrls: string[] = [
    'https://png.pngtree.com/background/20230522/original/pngtree-computer-sits-on-a-black-background-with-computers-picture-image_2688473.jpg',
    'https://png.pngtree.com/background/20230613/original/pngtree-black-pc-computer-sitting-on-a-black-background-picture-image_3422589.jpg',
    'https://png.pngtree.com/background/20230527/original/pngtree-some-laptops-with-two-computers-in-front-of-an-electronic-globe-picture-image_2769532.jpg',
    'https://png.pngtree.com/background/20230520/original/pngtree-laptops-and-computers-with-technology-abstract-picture-image_2676986.jpg',
  ];

  constructor() {}

  ngOnInit(): void {
    // Cambiar automáticamente las imágenes cada 2 segundos
    setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.imageUrls.length;
  }

  changeSlide(index: number) {
    this.currentSlide = index;
  }

}
