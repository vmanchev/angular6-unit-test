import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should go to users page and activate users nav item', () => {
    page.navigateTo('/users');
    expect(page.getActiveNav()).toEqual('Users');
  });

  it('should go to user id 1 page and activate users nav item', () => {
    page.navigateTo('/users/1');
    expect(page.getActiveNav()).toEqual('Users');
  });

  it('should go to items page and activate items nav item', () => {
    page.navigateTo('/items');
    expect(page.getActiveNav()).toEqual('Items');
  });

  it('should go to home page and activate home nav item', () => {
    page.navigateTo('/');
    expect(page.getActiveNav()).toEqual('Home');
  });

});