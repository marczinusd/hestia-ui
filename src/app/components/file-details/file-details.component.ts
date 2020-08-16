import { Component } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent {
  editorOptions = { theme: 'vs-dark', language: 'javascript', readOnly: true };
  code = 'function x() {\nconsole.log("Hello world!");\n}';
  model: NgxEditorModel = {
    language: 'javascript',
    uri: '',
    value: 'bla'
  };
}
