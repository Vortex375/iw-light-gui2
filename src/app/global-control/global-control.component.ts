import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

import { observable, computed } from 'mobx-angular';
import { ColorService } from '../color.service';
import { DeepstreamService } from '../deepstream.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-global-control',
  templateUrl: './global-control.component.html',
  styleUrls: ['./global-control.component.css']
})
export class GlobalControlComponent implements OnInit, AfterViewInit {

  brightness: number;

  private record: deepstreamIO.Record;

  private readonly ds: deepstreamIO.Client;

  constructor(
      private colorService: ColorService,
      private dsService: DeepstreamService,
      private element: ElementRef) {
    this.ds = dsService.getDeepstream();
   }

  ngOnInit() {
    this.record = this.ds.record.getRecord('light-control/global');
    this.record.subscribe(null, (data) => {

      let brightness = data.brightness;
      if ( ! _.isNumber(brightness)) {
        brightness = 0;
      }
      this.brightness = 255 * brightness;
    }, true);
  }

  ngAfterViewInit() {
    M.Range.init(this.element.nativeElement.querySelectorAll('.color-slider'));
  }

  setBrightness(value) {
    if ( ! this.record || ! this.record.isReady) {
      return;
    }
    const brightness = value / 255;

    this.record.set('brightness', brightness);
  }
}
