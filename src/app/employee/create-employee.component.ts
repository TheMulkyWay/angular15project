import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,AsyncValidator} from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent  implements OnInit{

public employeeForm!: FormGroup;


validationMessages : any ={
  'fullname':{ 
  'required': 'Full Name is required', 
  'minlength' :'Must be more than 2 characters', 
  'maxlength': 'must be less than 24'
},
  'email':{
  'required':'Email is reqiured.'
},
'skillName': { required: 'Skill Name is required.', },
  'experinceInYears': {'required': 'Experience is required. ',},
  'proficiency': {'required' : 'Proficiency is required.',},
  };

  formErrors: any={
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
 
    this.employeeForm.valueChanges.subscribe((data=>{
      this.logValidationErrors(this.employeeForm);
    }))

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

logValidationErrors(group : FormGroup=this.employeeForm) : void
{ console.log(Object.keys(group.controls).forEach((key: string)=>
  {
        const abstractControl = group.get(key);
        if(abstractControl instanceof FormGroup)
        { this.logValidationErrors(abstractControl); }
       else { 
        //    this.formErrors[key]=' ';
            if(abstractControl  && !abstractControl.valid && abstractControl.touched || abstractControl?.dirty )
                {
                    const messages=this.validationMessages[key];
                    console.log(messages);
                    console.log(abstractControl.errors);
  for(const errorKey in abstractControl.errors)
      if(errorKey){ this.formErrors[key] +=messages[errorKey] + ' ';}
    
}}
 }))
} 



onLoadData2()
{
this.logValidationErrors(this.employeeForm)

}






}
