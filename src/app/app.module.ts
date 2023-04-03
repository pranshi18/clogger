import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from "@angular/material/icon";
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router'
import { DxChartModule, DxPieChartModule, DxSelectBoxModule } from 'devextreme-angular';
import {MatButtonModule} from '@angular/material/button'

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HeaderComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    AppRoutingModule,
    DxChartModule,
    DxSelectBoxModule,
    MatButtonModule,
    DxPieChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
