import { Component, OnInit, Input, OnChanges, SimpleChange, AfterViewInit, ElementRef, Output, EventEmitter } from '@angular/core';

import { observable, computed } from 'mobx-angular';
import { ColorService } from '../color.service';

import * as _ from 'lodash';
import { DeepstreamService } from '../deepstream.service';

import { Client } from '@deepstream/client';
import { Record } from '@deepstream/client/dist/record/record';

@Component({
  selector: 'app-zone-control',
  templateUrl: './zone-control.component.html',
  styleUrls: ['./zone-control.component.css']
})
export class ZoneControlComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  zone: number;
  showDialog = false;
  saveMode = false;

  @observable sliders = {
    h: 0,
    s: 0,
    v: 0,
    w: 0
  };

  private record: Record;

  private readonly ds: Client;

  constructor(
      private colorService: ColorService,
      private dsService: DeepstreamService,
      private element: ElementRef) {
    this.ds = dsService.getDeepstream();
  }

  ngOnInit() {
    this.subscribe(this.zone);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    if (_.has(changes, 'zone')) {
      this.subscribe(changes['zone'].currentValue);
    }
  }

  ngAfterViewInit() {
    M.Range.init(this.element.nativeElement.querySelectorAll('.color-slider'));
  }

  subscribe(zone: number) {
    if (this.record) {
      this.record.discard();
      this.record = undefined;
    }

    this.record = this.ds.record.getRecord('light-control/zone/' + this.zone);

    this.record.subscribe(null, (data) => {

      let brightness = data.brightness;
      if ( ! _.isNumber(brightness)) {
        brightness = 0;
      }
      this.sliders.v = 255 * brightness;
      const color = data.value;
      this.setColor(color.r, color.g, color.b);
      this.sliders.w = color.w;

    }, true);

    this.record.on('error', (err) => console.error(err));
  }

  updateColor() {
    /* sadly module values update only after this event, so we must delay
     * execution of the event handler */
    setTimeout(() => {
      if ( ! this.record || ! this.record.isReady) {
        return;
      }

      const rgb = this.colorService.toRGB(this.sliders.h, this.sliders.s, 100);
      const brightness = this.sliders.v / 255;

      this.record.set('brightness', brightness as any);
      this.record.set('value', {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        w: this.sliders.w
      });
    }, 1);
  }

  setColor(r: number, g: number, b: number) {
    const hsv = this.colorService.toHSV(r, g, b);
    this.sliders.h = hsv.h;
    this.sliders.s = hsv.s;
  }

  applyTemplate(tpl) {
    this.setColor(tpl.r, tpl.g, tpl.b);
    this.updateColor();
  }

  openSelectDialog() {
    this.saveMode = false;
    this.showDialog = true;
  }

  openSaveDialog() {
    this.saveMode = true;
    this.showDialog = true;
  }

  dialogClosed() {
    this.showDialog = false;
  }

  @computed get currentColor() {
    return this.colorService.toRGB(this.sliders.h, this.sliders.s, this.sliders.v / 255);
  }

  @computed get previewColor() {
    return 'rgb(' + this.currentColor.r + ',' + this.currentColor.g + ',' + this.currentColor.b + ')'
  }

  @computed get brightnessGradient() {
    const rgb = this.colorService.toRGB(this.sliders.h, this.sliders.s, 100);
    return 'linear-gradient(to right, black, rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + '))'
  }

  get hueGradient() {
    return 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
  }

  @computed get saturationGradient() {
    const rgb = this.colorService.toRGB(this.sliders.h, 100, 100);
    return 'linear-gradient(to right, white, rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + '))'
  }
}
