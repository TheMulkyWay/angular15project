import { AbstractControl } from "@angular/forms";

export class CustomValidators {
   static emailDomain(domaniName: string) {
    return ( control: AbstractControl): { [key: string]: any} | null => {
        const email: string=control.value;

        const domain= email.substring(email.lastIndexOf('@') + 1);

        if(email=== '' || domain.toLowerCase()===domaniName.toLocaleLowerCase())
         {
        return null; 
        }
        else{ return { 'emailDomain' : true};
            }
        };
    }
}  //017@2m
