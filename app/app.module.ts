import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app-routing.module';
import { NativeScriptDateTimePickerModule } from "nativescript-datetimepicker/angular";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
//import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
 //import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent,
      SignupComponent,
  ],
  imports: [
      NativeScriptModule,
      AppRoutingModule,
      NativeScriptDateTimePickerModule,
     
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}

