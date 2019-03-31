import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [BrowserModule, FormsModule, DataTablesModule],
  declarations: [AppComponent, ChildComponent],
  bootstrap: [AppComponent],
  entryComponents: [ChildComponent]
})
export class AppModule { }
