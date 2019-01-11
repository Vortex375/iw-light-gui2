import { Component, OnInit } from '@angular/core';
import { DeepstreamService } from './deepstream.service';

import * as _ from 'lodash'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  zones: number[]

  private readonly ds: deepstreamIO.Client

  constructor(private dsService: DeepstreamService) {
    this.ds = dsService.getDeepstream()
  }

  ngOnInit() {
    this.ds.record.getList('iw-introspection/records/light-control/zone/.iw-index').subscribe((entries) => {
      console.log("entries", entries)
      this.zones = _.map(entries, z => parseInt(z))
      console.log("zones", this.zones)
    }, true)
  }
}
