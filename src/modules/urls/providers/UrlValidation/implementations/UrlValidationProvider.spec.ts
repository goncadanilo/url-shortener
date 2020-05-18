import faker from 'faker';

import UrlValidationProvider from './UrlValidationProvider';

describe('Url Validation Provider', () => {
  it('should returns false if an invalid url is provided', () => {
    const urlValidationProvider = new UrlValidationProvider();
    const url = 'any_url';
    const response = urlValidationProvider.test(url);

    expect(response).toBe(false);
  });

  it('should returns true if an valid url is provided', () => {
    const urlValidationProvider = new UrlValidationProvider();
    const url = faker.internet.url();
    const response = urlValidationProvider.test(url);

    expect(response).toBe(true);
  });
});
