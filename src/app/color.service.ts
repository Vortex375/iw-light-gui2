import { Injectable } from '@angular/core';

import * as onecolor from 'onecolor'

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  toRGB(h: number, s: number, v: number) {
    var color = onecolor("hsv(" + h + "," + s +  "%, " + (v * 100) + "%)")

    return {r: Math.round(255 * color.red()), g: Math.round(255 * color.green()), b: Math.round(255 * color.blue())}
  }

  toHSV(r: number, g: number, b: number) {
    var color = onecolor("rgb(" + r + "," + g +  ", " + b + ")")

    return {h: Math.round(360 * color.h()), s: Math.round(100 * color.s()), v: Math.round(100 * color.v())}
  }
}
