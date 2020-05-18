import IUrlValidation from '../models/IUrlValidation';

class UrlValidation implements IUrlValidation {
  private pattern: RegExp;

  constructor() {
    this.pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i',
    );
  }

  public test(url: string): boolean {
    return this.pattern.test(url);
  }
}

export default UrlValidation;
