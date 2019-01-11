import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MobxAngularModule } from 'mobx-angular'

import { AppComponent } from './app.component';
import { ZoneControlComponent } from './zone-control/zone-control.component';
import { GlobalControlComponent } from './global-control/global-control.component';

@NgModule({
  declarations: [
    AppComponent,
    ZoneControlComponent,
    GlobalControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MobxAngularModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
