import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { FilesQuery } from '@modules/files/state/files.query';
import { FilesService } from '@modules/files/state/files.service';
import { File } from '@shared/model/file';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.scss']
})
export class FileDetailsComponent implements OnInit, OnDestroy {
  public file: File;
  public code: string;
  public loading: boolean;
  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;
  public editorOptions = { theme: 'vs-dark', language: 'javascript', readOnly: true, automaticLayout: true };
  public extToLanguageMap = {
    ts: 'typescript',
    js: 'javascript',
    cs: 'csharp'
  };

  public extToCommentSymbolMap = {
    ts: '//',
    js: '//',
    cs: '//'
  };
  public showError: boolean;
  private selectedFileSubscription: Subscription;

  constructor(private filesQuery: FilesQuery, private filesService: FilesService) {}

  public ngOnDestroy(): void {
    this.selectedFileSubscription?.unsubscribe();
  }

  public ngOnInit(): void {
    this.isLoading$ = this.filesQuery.selectLoading();
    this.error$ = this.filesQuery.selectError();
    this.error$.subscribe(() => {
      this.showError = true;
    });
    this.selectedFileSubscription = this.filesQuery.activeId$.pipe(switchMap((val) => this.filesService.getFileDetails(val))).subscribe((details) => {
      this.file = details;
      const maxLineWidth = Math.max(...details.lines.map((l) => l.content.length)) + 4;
      this.code = _.chain(details.lines)
        .sortBy('lineNumber')
        .map((l) => {
          const tabs = ' '.repeat(maxLineWidth - l.content.length);
          return `${l.content}${tabs}${this.mapExtensionsToCommentSymbol(details.path)} HC: ${l.hitCount} DA: ${l.numberOfAuthors} CC: ${l.numberOfChanges} ${
            l.isBranched ? 'BC: ' + l.conditionCoverage : ''
          }`;
        })
        .value()
        .join('\n');
      this.editorOptions = { ...this.editorOptions, language: this.mapExtensionToMonacoLanguage(details.path) };
    });
  }

  public hideError(): void {
    this.showError = false;
  }

  private mapExtensionsToCommentSymbol(filePath: string): string {
    const ext = filePath.split('.').pop();

    return this.extToCommentSymbolMap[ext] as string;
  }

  private mapExtensionToMonacoLanguage(filePath: string): string {
    const ext = filePath.split('.').pop();

    return this.extToLanguageMap[ext] as string;
  }
}
