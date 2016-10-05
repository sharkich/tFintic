import { TfinticPage } from './app.po';

describe('tfintic App', function() {
  let page: TfinticPage;

  beforeEach(() => {
    page = new TfinticPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
