import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import * as _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class UserTemplatesService {

  private templatesObservable: BehaviorSubject<any[]>

  constructor(private http: HttpClient) {
    this.templatesObservable = new BehaviorSubject([])
  }

  getTemplates(): Observable<any[]> {
    return this.templatesObservable;
  }

  refreshTemplates() {
    this.http.get("/templates").subscribe(response => {
      const templates = _.map(response, (value, key) => _.assign({name: key}, value))
      console.log("templates", templates)
      this.templatesObservable.next(templates)
    })
  }

  saveTemplate(name: string, r: number, g: number, b: number) {
    let post = {}
    post[name] = {
      r: r,
      g: g,
      b: b
    }
    this.http.post("/templates", post).subscribe({
      error: (err) => console.log(err),
      complete: () => this.refreshTemplates()
    })
  }

  deleteTemplate(name: string) {
    this.http.delete(`/templates/${encodeURIComponent(name)}`).subscribe({
      error: (err) => console.log(err),
      complete: () => this.refreshTemplates()
    })
  }
}
