import { Component, OnInit } from '@angular/core';
import { DeepstreamService } from './deepstream.service';

import * as _ from 'lodash';
import { Client } from '@deepstream/client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  zones: number[];

  private readonly ds: Client;

  constructor(private dsService: DeepstreamService) {
    this.ds = dsService.getDeepstream();
  }

  ngOnInit() {
    this.ds.record.getRecord('iw-introspection/records/light-control/zone/.iw-index').subscribe(undefined, (entries) => {
      console.log('entries', entries);
      this.zones = _.map(entries, z => parseInt(z, 10));
      console.log('zones', this.zones);
    }, true);
  }
}
