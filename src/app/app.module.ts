import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee/employee.service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './reusable/text-input/text-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    TextInputComponent,
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
