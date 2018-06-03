import { Component, Input, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  private links = [];

  constructor(
    private el: ElementRef
  ) { }

  ngDoCheck() {
    this.getAllNavItems().removeActiveClass().setActive();
  }

  getAllNavItems() {
    this.links = this.el.nativeElement.querySelectorAll('ul li a');
    return this;
  }

  removeActiveClass() {
    this.links.forEach(item => item.classList.remove('nav-active'));
    return this;
  };

  setActive() {
    this.links.forEach(item => {

      if (window.location.pathname === item.pathname || (item.pathname !== '/' && window.location.pathname.indexOf(item.pathname) === 0)) {
        item.classList.add('nav-active');
      } 
    });
  }

}
