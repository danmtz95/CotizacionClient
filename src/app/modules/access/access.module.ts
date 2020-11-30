import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessDirective } from 'src/app/directives/access.directive';



@NgModule({
  declarations: [AccessDirective],
  imports: [
    CommonModule
  ],
  exports: [AccessDirective]
})
export class AccessModule { }
