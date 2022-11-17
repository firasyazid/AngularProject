import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eshop-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {
  selectedImageUrl: string | undefined;

  @Input() images: string[] | undefined;

 
  ngOnInit(): void {

    if (this.images?.length) {
      this.selectedImageUrl = this.images[0];
    }
  }

  changeSelectedImage(image : string) {
    this.selectedImageUrl = image ;
  }

 
}
