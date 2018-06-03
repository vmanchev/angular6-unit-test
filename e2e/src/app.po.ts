import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(page: string) {
    return browser.get(page);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getActiveNav() {
    return element(by.css('.nav-active')).getText();
  }
}
