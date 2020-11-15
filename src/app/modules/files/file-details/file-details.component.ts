import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilesQuery } from '@modules/files/state/files.query';
import { FilesService } from '@modules/files/state/files.service';
import { File } from '@shared/model/file';
import { Line } from '@shared/model/line';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit, OnDestroy {
  constructor(private filesQuery: FilesQuery, private filesService: FilesService) {}

  public file: File;
  public code: string;
  public loading: boolean;
  public editorOptions = { theme: 'vs-dark', language: 'javascript', readOnly: true, automaticLayout: true };
  private selectedFileSubscription: Subscription;

  extToLanguageMap = {
    ts: 'typescript',
    js: 'javascript',
    cs: 'csharp'
  };

  extToCommentSymbolMap = {
    ts: '//',
    js: '//',
    cs: '//'
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

  public ngOnDestroy(): void {
    this.selectedFileSubscription?.unsubscribe();
  }

  public ngOnInit(): void {
    this.loading = true;
    this.selectedFileSubscription = this.filesQuery.activeId$.pipe(switchMap((val) => this.filesService.getFileDetails(val))).subscribe(
      (details) => {
        this.file = details;
        const maxLineWidth = Math.max(...details.lines.map((l) => l.content.length)) + 4;
        this.code = details.lines
          .sort(FileDetailsComponent.lineSort)
          .map((l) => {
            const tabs = ' '.repeat(maxLineWidth - l.content.length);

            return `${l.content}${tabs}${this.mapExtensionsToCommentSymbol(details.path)} HC: ${l.hitCount} DA: ${l.numberOfAuthors} CC: ${l.numberOfChanges} ${
              l.isBranched ? l.conditionCoverage : ''
            }`;
          })
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

  private mapExtensionsToCommentSymbol(filePath: string): string {
    const ext = filePath.split('.').pop();

    return this.extToCommentSymbolMap[ext];
  }

  private mapExtensionToMonacoLanguage(filePath: string): string {
    const ext = filePath.split('.').pop();

    return this.extToLanguageMap[ext];
  }
}
