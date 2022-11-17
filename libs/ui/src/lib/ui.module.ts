import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SliderComponent } from './slider/slider.component';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './compnents/gallery/gallery.component';
@NgModule({
  imports: [CommonModule,ButtonModule],
  declarations:[BannerComponent,SliderComponent, GalleryComponent],
  exports:[BannerComponent,SliderComponent, GalleryComponent]

})
export class UiModule {}
