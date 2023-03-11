import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,AsyncValidator, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';

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
  'required':'Email is reqiured.',
  'emailDomain': 'Email domain should be keycost.com'
},
'confirmEmail':{
  'required':'Confirm Email is reqiured.'
  },
'phone':{
  'required':'Phone is reqiured.'
},
'skillName': { required: 'Skill Name is required.', },
  'experinceInYears': {'required': 'Experience is required. ',},
  'proficiency': {'required' : 'Proficiency is required.',},
  };

  formErrors: any={
    'fullName':'',
    'email': '',
    'confirmEmail': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
    };

constructor(private fb: FormBuilder) {}

ngOnInit() {
  this.employeeForm=this.fb.group({
    fullName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(12)], 
    contactPreference: ['email'],

    emailGroup: this.fb.group({
    email:['', [Validators.required, this.emailDomain]],
    confirmEmail:['', [Validators.required, this.matchValues(('email'))]],   }),
    
    phone: [''],
    skills: this.fb.array([this.addSkillFormGroup()])
    });

 
    this.employeeForm.get('contactPreferences')?.valueChanges.subscribe((data)=> { this.onContactPreferenceChange(data)});

    this.employeeForm.valueChanges.subscribe((data=>{    this.logValidationErrors(this.employeeForm);     }))  
    }
 


onSubmit(){     console.log(this.employeeForm.touched);  console.log(this.employeeForm.value);  console.log(this.employeeForm.controls['fullName'].touched);  console.log(this.employeeForm.get('fullName'));  console.log(this.employeeForm);}
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

// logValidationErrors(group : FormGroup=this.employeeForm) : void
// { console.log(Object.keys(group.controls).forEach((key: string)=>
//   {
// const abstractControl = group.get(key);


// this.formErrors[key]='';


// if(abstractControl instanceof FormGroup)
// { this.logValidationErrors(abstractControl); }
// else { 
// //    this.formErrors[key]=' ';


// if(abstractControl  && !abstractControl.valid 
//   && abstractControl.touched || abstractControl?.dirty ){
// const messages=this.validationMessages[key];
// //console.log(messages); console.log(abstractControl.errors);
// for(const errorKey in abstractControl.errors)
// if(errorKey)
// { this.formErrors[key] +=messages[errorKey] + ' ';}
    
// }}



//  }))
// } 

logValidationErrors(group : FormGroup=this.employeeForm) : void
{Object.keys(group.controls).forEach((key: string)=> {
const abstractControl = group.get(key);


this.formErrors[key]='';
if(abstractControl  && !abstractControl.valid 
  && (abstractControl.touched || abstractControl?.dirty )){
const messages=this.validationMessages[key];


for(const errorKey in abstractControl.errors) {
if(errorKey) { 
  this.formErrors[key] +=messages[errorKey] + ' ';
	}
        }
      }

if(abstractControl instanceof FormGroup)
{ this.logValidationErrors(abstractControl); }


if(abstractControl instanceof FormArray)  { 
for (const control of abstractControl.controls) {
if(control instanceof FormGroup) {
this.logValidationErrors(control); 
}}}}
);
}


onContactPreferenceChange(selected : string){
  const phoneControl=this.employeeForm.get('phone');
  if(phoneControl?.value==='phone')
  {phoneControl.setValidators(Validators.required)  }
  else   {phoneControl?.clearValidators()}

phoneControl?.updateValueAndValidity();

}


 emailDomain(control: AbstractControl): { [key: string]: any} | null {
  const email: string=control.value;
  const domain= email.substring(email.lastIndexOf('@') + 1);
  if(domain.toLowerCase()==='keycost.com') {
  return null;
  }
  else{ return { 'emailDomain' : true};
  }
  }

matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
   }


   
addSkillButtonClick() 
{(<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
}


addSkillFormGroup(): FormGroup{
  return this.fb.group({
    skillName: ['',Validators.required],
    experienceInYears: ['',Validators.required],
    proficiency: ['', Validators.required]
    })

}


}