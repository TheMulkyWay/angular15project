import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,AsyncValidator, AbstractControl, ValidatorFn, FormArray} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomValidators } from '../reusable/custom.validators';

/* for editing need   027@3m52*/
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { ISkill } from './ISkill';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent  implements OnInit{

  public employeeForm!: FormGroup;
  private sub!: Subscription;
  public employee!: IEmployee;
  employees!: IEmployee[];
  pageTitle = 'Employee Edit';
  errorMessage = '';


get skills(): FormArray {  return <FormArray>this.employeeForm.get('skills'); }

                                  
 constructor(private fb: FormBuilder,  private route : ActivatedRoute, private _employeeService: EmployeeService  ) {}

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
    email:['', [Validators.required, CustomValidators.emailDomain('hp.com')]],
    confirmEmail:['', [Validators.required, this.matchValues(('email'))]],   }),
    
    phone: [''],
    showSkills: true,
    skills: this.fb.array([this.addSkillFormGroup()])
    });

    // Read the product Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const empId = Number(this.route.snapshot.paramMap.get('id'));
        this.getEmployee(empId);
      }
    );
}

getEmployee(id: number): void {
        this._employeeService.getEmployee(id).subscribe({ 
          next: (employee: IEmployee) => this.displayEmployee(employee),
          error: err => this.errorMessage = err
        });
    }

editEmployee(employee: IEmployee){
this.employeeForm.patchValue(
  {
    fullName: employee.fullName,
    contactPreference: employee.contactPreference,
    emailGroup: {
    email: employee.email,
    confirmEmail: employee.email },
    phone: employee.phone

  }
)
}
    
          




onSubmit()
{                    console.log(this.employeeForm.touched);  console.log(this.employeeForm.value);  
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


removeSkillButtonClick(skillGroupIndex: number): void{
  (<FormArray>this.employeeForm.get('skills')).removeAt(skillGroupIndex);

}




addSkillFormGroup(): FormGroup{
  return this.fb.group({
    skillName: ['',Validators.required],
    experienceInYears: ['',Validators.required],
    proficiency: ['', Validators.required]
    })
}

onContactPreferenceChange(selected : string)
{
  const phoneControl=this.employeeForm.get('phone');
  
  if(phoneControl?.value==='phone')
  {
    phoneControl.setValidators(Validators.required)  
  }
  else   {
    phoneControl?.clearValidators()
  }

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



displayEmployee(employee: IEmployee): void {
  if (this.employeeForm) {
    this.employeeForm.reset();
  }
  this.employee = employee;

  if (this.employee.id === 0) {
    this.pageTitle = 'Add Employee';
  } else {
    this.pageTitle = `Edit Employee: ${this.employee.fullName}`;
  }
}





validationMessages : any ={
  'fullName':{ 
  'required': 'Full Name is required', 
  'minlength' :'Must be more than 2 characters', 
  'maxlength': 'must be less than 24'
},

 'email':{ 'required':'Email is reqiured.',
 'emailDomain': 'Email domain should be keycost.com'},
'confirmEmail':{'required':'Confirm Email is reqiured.'},
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






}
