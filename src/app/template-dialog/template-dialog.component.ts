import { Component, OnInit, Input, AfterViewInit, ElementRef, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';
import { UserTemplatesService } from '../user-templates.service';
import { ColorService } from '../color.service';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.css']
})
export class TemplateDialogComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  saveMode: boolean;
  @Input()
  show: boolean;
  @Input()
  currentColor;
  @Output()
  selectedTemplate = new EventEmitter();
  @Output()
  closed = new EventEmitter();

  newTemplateName: string;
  confirmMessage: string;
  templates: any[];

  private confirmCallback: (confirmed: boolean) => void;
  private viewReady = false;

  constructor(
      private element: ElementRef,
      private templateService: UserTemplatesService,
      private colors: ColorService) { }

  ngOnInit() {
    this.templateService.getTemplates().subscribe(tpls => this.templates = tpls);
    this.templateService.refreshTemplates();
  }

  ngAfterViewInit() {
    this.viewReady = true;
    M.Modal.init(this.element.nativeElement.querySelector('#modalTemplates'), {
      onCloseEnd: () => {
        this.show = false;
        this.closed.emit();
      }
    });
    M.Modal.init(this.element.nativeElement.querySelector('#modalConfirm'));

    if (this.show) {
      M.Modal.getInstance(this.element.nativeElement.querySelector('#modalTemplates')).open();
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if ( ! this.viewReady) {
      return;
    }
    if (_.has(changes, 'show')) {
      if (changes['show']) {
        M.Modal.getInstance(this.element.nativeElement.querySelector('#modalTemplates')).open();
      } else {
        M.Modal.getInstance(this.element.nativeElement.querySelector('#modalTemplates')).close();
      }
    }
  }

  templateAction(index: number) {
    if (this.saveMode) {
      this.overwriteTemplate(index);
    } else {
      this.applyTemplate(index);
    }
  }

  applyTemplate(index) {
    const tpl = this.visibleTemplates[index];
    if (!tpl) {
      console.error('missing template', index);
      return;
    }
    this.selectedTemplate.emit(tpl);
  }

  overwriteTemplate(index) {
    console.log('overwrite template', index, this.visibleTemplates[index]);
    this.newTemplateName = this.visibleTemplates[index].name;
    this.saveNewTemplate();
  }

  saveNewTemplate() {
    console.log('save new template', this.newTemplateName);
    if (this.newTemplateName == '') {
      return;
    }

    if (_.find(this.templates, (tpl) => tpl.name == this.newTemplateName)) {
      this.confirmMessage = `Overwrite existing template "${this.newTemplateName}"?`;
      this.confirm(confirmed => {
        if (confirmed) {
          this.doSaveNewTemplate();
        } else {
          this.element.nativeElement.querySelector('#newTemplateName').focus();
        }
      });
    } else {
      this.doSaveNewTemplate();
    }
  }

  doSaveNewTemplate() {
    const rgb = this.colors.toRGB(this.currentColor.h, this.currentColor.s, 100);
    console.log('save template', rgb);
    this.templateService.saveTemplate(this.newTemplateName, rgb.r, rgb.g, rgb.b);
    this.newTemplateName = ''
  }

  deleteTemplate(index: number) {
    console.log('delete template', index, this.visibleTemplates[index]);
    const templateName = this.visibleTemplates[index].name;
    this.confirmMessage = `Delete template "${templateName}"?`;
    this.confirm(confirmed => {
      if (confirmed) {
        console.log('delete template', templateName);
        this.templateService.deleteTemplate(templateName);
      }
    });
  }

  confirm(cb) {
    this.confirmCallback = cb;
    M.Modal.getInstance(this.element.nativeElement.querySelector('#modalConfirm')).open();
  }

  confirmComplete(confirmed: boolean) {
    console.log('confirm complete :', confirmed);
    M.Modal.getInstance(this.element.nativeElement.querySelector('#modalConfirm')).close();
    if (this.confirmCallback) {
      this.confirmCallback(confirmed);
    }
    this.confirmCallback = undefined;
  }

  get visibleTemplates() {
    return _.filter(this.templates || [], tpl => ! (tpl.system && this.saveMode));
  }

  previewColor(tpl) {
    return `rgb(${tpl.r},${tpl.g},${tpl.b})`;
  }
}
