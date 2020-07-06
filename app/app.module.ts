import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app-routing.module';
import { NativeScriptDateTimePickerModule } from "nativescript-datetimepicker/angular";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DetailleOffreComponent } from './detaille-offre/detaille-offre.component';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { DropDownModule } from "nativescript-drop-down/angular";

@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      SignupComponent,
      DetailleOffreComponent,
    
  ],
  imports: [
      NativeScriptModule,
      AppRoutingModule,
      NativeScriptDateTimePickerModule,
      NativeScriptFormsModule,
      NativeScriptHttpClientModule,
      NativeScriptUISideDrawerModule,
      TNSCheckBoxModule,
      DropDownModule
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

