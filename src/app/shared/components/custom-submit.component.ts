import { Directive, Input, HostListener, ElementRef} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[formGroup]',
})
export class CustomSubmitComponent {
  constructor(public el: ElementRef) { }

  @Input('formGroup') customSubmit: FormGroup;

  @HostListener('submit', ['$event'])
  onSubmit(e) {
    e.preventDefault();
    let focused = false;
    (<any>Object).values(this.customSubmit.controls).forEach((control) => {
      control.markAsTouched();

      if (control.controls) {
        control.controls.forEach((c) => control.markAsTouched(true));
      }
    });

    let x = this.el.nativeElement.querySelector('.ng-invalid');
    if(x) x.focus();
  }
}