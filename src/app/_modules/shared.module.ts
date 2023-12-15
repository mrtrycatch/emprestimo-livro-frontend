import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastrModule.forRoot(), NgxSpinnerModule],
  exports: [ToastrModule, NgxSpinnerModule],
})
export class SharedModule {}
