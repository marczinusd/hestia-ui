import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { FileDetailsComponent } from './file-details/file-details.component';

@NgModule({
  imports: [CommonModule, MonacoEditorModule.forRoot(), MatProgressSpinnerModule, FormsModule, MatButtonModule],
  exports: [FileDetailsComponent],
  declarations: [FileDetailsComponent]
})
export class FilesModule {}
