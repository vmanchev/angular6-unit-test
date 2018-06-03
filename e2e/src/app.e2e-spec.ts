import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display project name', () => {
    page.navigateTo('/');
    expect(page.getParagraphText()).toEqual('Angular6 unit test project');
  });

});
