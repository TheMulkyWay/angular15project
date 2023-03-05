import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,AsyncValidator} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent  implements OnInit{

public employeeForm!: FormGroup;


validationMessages ={
  'fullname':{ 'required': 'Full Name is required', 'minlength' :'Must be more than 2 characters', 'maxlength': 'must be less than 24'},
  'email':{'required':'Email is reqiured.'},
  'skillName': { required: 'Skill Name is required.', },
  'experinceInYears': {'required': 'Experience is required. ',},
  'proficiency': {'required' : 'Proficiency is required.',},
  };

  formErrors={
    'fullName':'',
    'email': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
    };

constructor(private fb: FormBuilder) {}

ngOnInit() {
  this.employeeForm=this.fb.group({
    fullName: ['', 
    
    Validators.required, Validators.minLength(2), Validators.maxLength(12)],
    email:['', Validators.required],
    skills: this.fb.group({
    skillName: ['',Validators.required],
    experienceInYears: ['',Validators.required],
    proficiency: ['', Validators.required]
    })
    });
 
 //   this.employeeForm.get('fullName')?.valueChanges.subscribe(value=> console.log(value));
 // this.employeeForm.valueChanges.subscribe((value: any)=> console.log(JSON.stringify(value)));

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


logKeyValuePairs(group : FormGroup) : void
{ console.log(Object.keys(group.controls).forEach((key: string)=>
  {
        const abstractControl = group.get(key);
        if(abstractControl instanceof FormGroup){ this.logKeyValuePairs(abstractControl); }
       else
         { console.log('key =' + key + 'Value =' + abstractControl?.value); }
  }
  ))} 


onLoadData2()
{
this.logKeyValuePairs(this.employeeForm)

}






}
