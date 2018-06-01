import { Component, OnInit } from '@angular/core';
import { ChangemePipe } from '../../pipes/changeme/changeme.pipe';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css'],

})
export class SimpleComponent implements OnInit {

  private welcomeText = 'This is a simple component';

  constructor() { }

  ngOnInit() {
  }

  getWelcomeText() {
    return this.welcomeText;
  }

  changeText(text: string) {
    this.welcomeText = text;
  }
}
