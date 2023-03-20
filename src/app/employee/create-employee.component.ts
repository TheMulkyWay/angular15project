import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,AsyncValidator, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import { CustomValidators } from '../reusable/custom.validators';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent  implements OnInit{

  public employeeForm!: FormGroup;
   
  validationMessages : any ={
  'fullName':{ 
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
'emailGroup': {'emailMismatch': 'Email and confirm email do not match'},

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
    'emailGroup': '',
      'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
                                  };

get skills(): FormArray {  return <FormArray>this.employeeForm.get('skills'); }

                                  
 constructor(private fb: FormBuilder) {}

ngOnInit() {
  this.initialiseFormControls();
  this.employeeForm.get('contactPreferences')?.valueChanges.subscribe((data)=> { this.onContactPreferenceChange(data)});
  this.employeeForm.valueChanges.subscribe((data=>{    this.logValidationErrors(this.employeeForm);     }))  
    }
 
initialiseFormControls(){
  this.employeeForm=this.fb.group({
    fullName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(12)], 
    contactPreference: ['email'],

    emailGroup: this.fb.group({
    email:['', [Validators.required, CustomValidators.emailDomain('dell.com')]],
    confirmEmail:['', [Validators.required, this.matchValues(('email'))]],   }),
    
    phone: [''],
    showSkills: true,
    skills: this.fb.array([this.addSkillFormGroup()])
    });


}

onSubmit()
{                    console.log(this.employeeForm.touched);  console.log(this.employeeForm.value);  console.log(this.employeeForm.controls['fullName'].touched);  
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


}
);
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

onContactPreferenceChange(selected : string){
  const phoneControl=this.employeeForm.get('phone');
  if(phoneControl?.value==='phone')
  {phoneControl.setValidators(Validators.required)  }
  else   {phoneControl?.clearValidators()}

phoneControl?.updateValueAndValidity();

}

matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
   }

matchEmail(group : AbstractControl) :{ [key: string]: any}  | null {
const emailControl=group.get('email');
const confirmEmailControl = group.get('confirmEmail');
if (emailControl?.value===confirmEmailControl?.value  || confirmEmailControl?.pristine)
{return null;}
else{return {'emailMismatch': true};
} 
}

}
