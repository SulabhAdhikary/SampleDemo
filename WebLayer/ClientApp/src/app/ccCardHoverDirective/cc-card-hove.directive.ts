import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';
import { CommonServiceService } from '../commonservices/common-service.service';

@Directive({
  selector: '[appCcCardHove]'
})
export class CcCardHoveDirective {

  constructor(private el: ElementRef, private renderer: Renderer, private _commonService: CommonServiceService) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
  }

  @HostListener('mouseover') onMouseOver() {

    this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', 'white');
    }

    @HostListener('mouseout') onMouseOut() {
      this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', 'gray');
      }

   @HostListener('click') onRowClick() {
     this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', 'red');
     const part = this.el.nativeElement.querySelector('.idclass');
     this._commonService.RowSelectedInFetchData(part.innerHTML);
    }


}
