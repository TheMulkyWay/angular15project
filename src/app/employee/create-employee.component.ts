import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent  implements OnInit{

public employeeForm!: FormGroup;

constructor(private fb: FormBuilder) {}

ngOnInit() {
  this.employeeForm=this.fb.group({
    fullName: ['', Validators.required],
    email:[''],
    skills: this.fb.group({
    skillName: [''],
    experienceInYears: [''],
    proficiency: ['beginner']
    })
    });
    }
 
onSubmit(){   
  console.log(this.employeeForm.touched);
  console.log(this.employeeForm.value);
  console.log(this.employeeForm.controls['fullName'].touched);
  console.log(this.employeeForm.get('fullName'));
  console.log(this.employeeForm);
}


onLoadData(){

  this.employeeForm.setValue({
    fullName: 'MulkyWay Tech',
    email : 'mulkyway@gmail.com',
    skills: {
    skillName : 'C#',
    experienceInYears : 5,
    proficiency: 'beginner'
    }
        });
  
}


}
