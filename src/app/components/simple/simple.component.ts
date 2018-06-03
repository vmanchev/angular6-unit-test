import { Component } from '@angular/core';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css'],

})
export class SimpleComponent {

  private welcomeText = 'This is a simple component';

  getWelcomeText() {
    return this.welcomeText;
  }

  changeText(text: string) {
    this.welcomeText = text;
  }
}
