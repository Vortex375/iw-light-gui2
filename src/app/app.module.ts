import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { MobxAngularModule } from 'mobx-angular'

import { AppComponent } from './app.component';
import { ZoneControlComponent } from './zone-control/zone-control.component';
import { GlobalControlComponent } from './global-control/global-control.component';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ZoneControlComponent,
    GlobalControlComponent,
    TemplateDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MobxAngularModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
