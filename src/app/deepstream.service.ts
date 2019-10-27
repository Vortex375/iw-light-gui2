import { Injectable } from '@angular/core';

import fuckthis, { Client } from '@deepstream/client';
import { Options } from '@deepstream/client/dist/client-options';
const deepstream: (url: string, options?: Partial<Options>) => Client = fuckthis as any;


@Injectable({
  providedIn: 'root'
})
export class DeepstreamService {

  private readonly ds: Client;

  constructor() {
    const hostname = window.location.hostname;
    this.ds = deepstream(hostname + ':6020');
    this.ds.login();
  }

  getDeepstream(): Client {
    return this.ds;
  }
}
