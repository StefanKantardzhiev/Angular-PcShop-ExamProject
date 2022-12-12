import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/home/home.component';
import { AppEmailDirective } from './validators/app-email.directive';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HomeComponent, AppEmailDirective],
  imports: [CommonModule,AppRoutingModule],
  exports: [HomeComponent,AppEmailDirective],
})
export class SharedModule {}
