import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
export class CrossSiteScriptValidator implements AsyncValidator
{
    public ForbiddenKeyWords: Array<string> = ['xhr', 'asdf', 'fetch', 'http', 'ftp', 'promise', 'then'];

    /**
     * test if string contains forbidden keyword
     * creating this method with a lambda means .bind should not be needed later
     * @param control {AbstractControl} the control representing the field in the Angular Reactive Form
     * @returns anonymous string boolean key value pair or null
     */
    public containsForbiddenKeyWord = (control: AbstractControl): {[s: string]: boolean} | null => 
    {
      let foundForbiddenKeyWord: boolean = false;
      if ((control != null) && (control.value != null))
      {
          const lowercaseValue: string = control.value.toLowerCase();
          for(let i = 0; i < this.ForbiddenKeyWords.length; i++)
          {
              if (lowercaseValue.includes(this.ForbiddenKeyWords[i]))
              {
                  //true that equationTextBox has an error -- this is for the error list
                  return {'equationTextBoxIsInvalid': true}; 
              }
          }
      }
      //null means no errors
      return null; 
    }

    /*
    public containsForbiddenKeyWord(control: AbstractControl): {[s: string]: boolean} | null
    {
        let foundForbiddenKeyWord: boolean = false;
        if ((control != null) && (control.value != null))
        {
            const lowercaseValue: string = control.value.toLowerCase();
            for(let i = 0; i < this.ForbiddenKeyWords.length; i++)
            {
                if (lowercaseValue.includes(this.ForbiddenKeyWords[i]))
                {
                    //true that equationTextBox has an error -- this is for the error list
                    return {'equationTextBoxIsInvalid': true}; 
                }
            }
        }
    //null means no errors
    return null; 
    
    }
    */
  //https://www.netjstech.com/2020/11/custom-async-validator-angular-reactive-form.html
  public validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
  {
    if (this == null)
    {
      return of(null);
    }
    else
    {
      return of(this.containsForbiddenKeyWord(control));
    }
  }
}