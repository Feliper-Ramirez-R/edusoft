import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-instituto',
  templateUrl: './web-instituto.component.html',
  styleUrls: ['./web-instituto.component.scss']
})
export class WebInstitutoComponent {

  constructor(private router:Router
                 ){}

  inicio(){
    this.router.navigate(['/web/webMain'])
  }

  login(){
    this.router.navigate(['/auth/login'])
  }

  hasClass(element: HTMLElement, className: string): boolean {
    if (element?.classList) {
      return element.classList.contains(className);
    } else if (element) {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    }
    return false;
  }


  validClass(){
    const landingMenu:any = document.getElementById('landing-menu');

    if (this.hasClass(landingMenu, 'landing-menu-active')) {
     console.log('si hay clase');
			this.hideMenu();
		} else {
      console.log('no hay clase');
			 this.showMenu();
		}
  }

  validUrl(){
    const landingMenu:any = document.getElementById('landing-mask');
			this.hideMenu();
  }


  hideMenu() {
    console.log('la quite perros');
    const landingMenu:any = document.getElementById('landing-menu');
    const landingMenuButton = document.getElementById('landing-menu-button');
    const landingMask = document.getElementById('landing-mask');

    if (landingMenu && landingMenuButton && landingMask) {
      this.removeClass(landingMenu, 'landing-menu-active');
      this.removeClass(landingMenuButton, 'landing-menu-active');
      this.removeClass(landingMask, 'landing-menu-active');
    }

  }

  showMenu() {
    console.log('la puse perros');
    
    const landingMenu:any = document.getElementById('landing-menu');
    const landingMenuButton = document.getElementById('landing-menu-button');
    const landingMask = document.getElementById('landing-mask');

    if (landingMenu && landingMenuButton && landingMask) {
      this.addClass(landingMenu, 'landing-menu-active');
      this.addClass(landingMenuButton, 'landing-menu-active');
      this.addClass(landingMask, 'landing-menu-active');
    }

  }

  private addClass(element: HTMLElement, className: string) {
    if (element?.classList) {
      element.classList.add(className);
    } else if (element) {
      element.className += ' ' + className;
    }
  }

  private removeClass(element: HTMLElement, className: string) {
    if (element?.classList) {
      element.classList.remove(className);
    } else if (element) {
      element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

}
