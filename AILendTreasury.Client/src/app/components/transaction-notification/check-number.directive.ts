import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[aiCheckNumber]'
})
export class CheckNumberDirective {

  constructor(private elementRef:ElementRef) { }

  //private regex:RegExp = new RegExp('^[0-9]*$');
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);  
  private specialKeys:Array<string> = ['Backspace']; 

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent){
    if(this.specialKeys.indexOf(event.key) !== -1){
      return;
    }
    const inputValue: string = this.elementRef.nativeElement.value.concat(event.key);
    //console.log(event.key);
    if (inputValue && !String(inputValue).match(this.regex)) {
      event.preventDefault();
    }
    return;
  }
}
