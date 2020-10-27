import { Component, Input, OnInit } from '@angular/core';
import { FileDetailsService } from '../../services/file-details.service';
import { File } from '../../model/file';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {
  @Input() headerId: Observable<string>;
  public file: File;
  public code: string;
  public loading: boolean;
  public editorOptions = { theme: 'vs-dark', language: 'javascript', readOnly: true };

  extToLanguageMap = {
    ts: 'typescript',
    js: 'javascript',
    cs: 'csharp'
  };
  showError: boolean;

  constructor(private service: FileDetailsService) {}

  public ngOnInit(): void {
    this.loading = true;
    this.headerId
      .pipe(
        switchMap((val) => {
          return this.service.getFileDetails(val);
        })
      )
      .subscribe(
        (details) => {
          this.file = details;
          this.code = details.lines.map((l) => l.content).join('\n');
          this.editorOptions = { ...this.editorOptions, language: this.mapExtensionToMonacoLanguage(details.path) };
        },
        () => {
          this.showError = true;
        },
        () => {
          this.loading = false;
        }
      );
  }

  public hideError(): void {
    this.showError = false;
  }

  private mapExtensionToMonacoLanguage(filePath: string): string {
    const ext = filePath.split('.').pop();

    return this.extToLanguageMap[ext];
  }
}
