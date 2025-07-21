import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FileUploadService } from 'src/app/shared/file-upload.service';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'ctxte',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {

  @Input() label = 'Enter text here...';
  @Input() data = '';
  @Input() editable = true;
  @Output() cModel = new EventEmitter<string>();

  // Editor = ClassicEditor;
  editorConfig: AngularEditorConfig = {
    editable: this.editable,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '3',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      { class: 'kanit-light', name: 'Kanit Light' },
      { class: 'kanit-medium', name: 'Kanit Medium' },
      { class: 'kanit-semibold', name: 'Kanit SemiBold' },
      { class: 'kanit-regular', name: 'Kanit Regular' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    // uploadUrl: this.provide.endpoint + "/editor",
    // upload: (file: File) => { return ""; },
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [],
      []
    ]
  };

  constructor(private provide: FileUploadService) { }

  ngOnInit(): void {
    this.editorConfig.editable = this.editable;
    this.cModel.emit(this.data);
  }

  emit(param) {
    this.cModel.emit(param);
  }

}
