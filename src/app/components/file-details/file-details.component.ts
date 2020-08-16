import { Component, Input, OnInit } from '@angular/core';
import { FileHeader } from '../../model/fileHeader';
import { FileDetailsService } from '../../services/file-details.service';
import { FileDetails } from '../../model/fileDetails';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {
  @Input() header: Observable<FileHeader>;
  public file: FileDetails;
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
    this.header = this.header ?? of();
    this.loading = true;
    this.header
      .pipe(
        switchMap((val) => {
          return this.service.getFileDetails(val.id, 1);
        })
      )
      .subscribe(
        (details) => {
          this.file = details;
          this.code = details.lines.map((l) => l.text).join('\n');
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
