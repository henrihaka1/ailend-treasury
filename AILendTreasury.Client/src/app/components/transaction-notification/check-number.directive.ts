import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[aiCheckNumber]'
})
export class CheckNumberDirective {

  constructor(private elementRef:ElementRef) { }

  //private regex:RegExp = new RegExp('^[0-9]*$');
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);   

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent){
    const inputValue: string = this.elementRef.nativeElement.value.concat(event.key);
    if (inputValue && !String(inputValue).match(this.regex)) {
      event.preventDefault();
    }
    return;
  }
}
