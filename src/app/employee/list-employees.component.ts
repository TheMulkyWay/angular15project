import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  public employees!: IEmployee[];
  errorMessage = '';

   constructor(private _employeeServicee : EmployeeService,
    private  _router : Router) {}

  ngOnInit():  void {
   this._employeeServicee.getEmployees().subscribe({
   next: employees =>{ this.employees=employees;},
   error: err => this.errorMessage = err
   });
  }


editButtonClick(employeeId: number )
{this._router.navigate(['/edit', employeeId])
}



}
