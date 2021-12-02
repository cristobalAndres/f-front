import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AppComponent } from './app.component';
import { FintualService } from "../services/fintual.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [FintualService],
  bootstrap: [AppComponent]
})
export class AppModule { }
