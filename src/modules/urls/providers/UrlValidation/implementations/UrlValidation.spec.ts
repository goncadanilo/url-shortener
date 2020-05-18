import faker from 'faker';

import UrlValidation from './UrlValidation';

describe('Url Validation Provider', () => {
  it('should returns false if an invalid url is provided', () => {
    const urlValidation = new UrlValidation();
    const url = 'any_url';
    const response = urlValidation.test(url);

    expect(response).toBe(false);
  });

  it('should returns true if an valid url is provided', () => {
    const urlValidation = new UrlValidation();
    const url = faker.internet.url();
    const response = urlValidation.test(url);

    expect(response).toBe(true);
  });
});
