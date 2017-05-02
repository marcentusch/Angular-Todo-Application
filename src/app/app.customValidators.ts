import { FormControl } from '@angular/forms';

export class TodoValidators{

    static limitChars(){

        return function(control: FormControl){
            if(control.value.match(/[0-9]{20}/)) {
                    console.log("Error with validator");
                    return {'limitError': true}
            }
        }
    }

}


