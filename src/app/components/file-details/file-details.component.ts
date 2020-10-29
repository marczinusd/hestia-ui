import { Component, Input, OnInit } from '@angular/core';
import { FileDetailsService } from '../../services/file-details.service';
import { File } from '../../model/file';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Line } from '../../model/line';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit {
  constructor(private service: FileDetailsService) {}
  @Input() headerId: Observable<string>;
  public file: File;
  public code: string;
  public loading: boolean;
  public editorOptions = { theme: 'vs-dark', language: 'javascript', readOnly: true, automaticLayout: true };

  extToLanguageMap = {
    ts: 'typescript',
    js: 'javascript',
    cs: 'csharp'
  };
  showError: boolean;

  private static lineSort(first: Line, second: Line): number {
    if (first.lineNumber < second.lineNumber) {
      return -1;
    }
    if (first.lineNumber > second.lineNumber) {
      return 1;
    }

    return 0;
  }

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
          this.code = details.lines
            .sort(FileDetailsComponent.lineSort)
            .map((l) => l.content)
            .join('\n');
          this.editorOptions = { ...this.editorOptions, language: this.mapExtensionToMonacoLanguage(details.path) };
          this.loading = false;
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
