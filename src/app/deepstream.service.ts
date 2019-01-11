import { Injectable } from '@angular/core';

import * as deepstream from "deepstream.io-client-js"

const DEEPSTREAM_CONFIG = {
  transports: ["websocket"]
}

@Injectable({
  providedIn: 'root'
})
export class DeepstreamService {

  private readonly ds: deepstreamIO.Client

  constructor() { 
    const hostname = window.location.hostname
    // this.ds = deepstream(hostname + ":6020", DEEPSTREAM_CONFIG)
    this.ds = deepstream("192.168.0.22:6020", DEEPSTREAM_CONFIG)
    this.ds.login()
  }

  getDeepstream(): deepstreamIO.Client {
    return this.ds
  }
}
