import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function GreaterThanControlValidator(controlName: string, comparedControlName: string, canBeEqual: boolean = false) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const controlValue = Number(control.value);
        const comparedControl = formGroup.controls[comparedControlName];
        const comparedControlValue = Number(comparedControl.value);

        if (control.errors && !control.errors.greaterThan) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        if ((controlValue > comparedControlValue) ||
            (!canBeEqual && controlValue == comparedControlValue)) {
            control.setErrors({ greaterThan: true });
        } else {
            control.setErrors(null);
        }
    }
}

export function GreaterThanMultipleControlValidator(controlName: string, 
    aditionalControlNames: Array<string>, comparedControlNames: Array<string>, 
    canBeEqual: boolean = false) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        let controlValue = Number(control.value);
        let aditionalControlValue: number = 0;
        let comparedControlValue: number = 0;

        for (let index = 0; index < aditionalControlNames.length; index++) {
            let aditionalControlAmount = formGroup.controls[aditionalControlNames[index]];
            aditionalControlValue += Number(aditionalControlAmount.value);
        }

        for (let index = 0; index < comparedControlNames.length; index++) {
            let comparedControl = formGroup.controls[comparedControlNames[index]];
            comparedControlValue += Number(comparedControl.value);
        }

        if (control.errors && !control.errors.greaterThan) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        controlValue += aditionalControlValue;
        if ((controlValue > comparedControlValue) ||
            (!canBeEqual && controlValue == comparedControlValue)) {
            control.setErrors({ greaterThan: true });
        } else {
            control.setErrors(null);
        }
    }
}

export function GreaterThanAmountValidator(controlName: string, comparedAmount: number, canBeEqual: boolean = false) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const controlValue = Number(control.value);

        if (control.errors && !control.errors.greaterThan) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        if ((controlValue > comparedAmount) ||
            (!canBeEqual && controlValue == comparedAmount)) {
            control.setErrors({ greaterThan: true });
        } else {
            control.setErrors(null);
        }
    }
}