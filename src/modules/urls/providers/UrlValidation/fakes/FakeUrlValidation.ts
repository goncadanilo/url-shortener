import IUrlValidation from '../models/IUrlValidation';

class FakeUrlValidation implements IUrlValidation {
  private response = true;

  public test(): boolean {
    return this.response;
  }

  public fakeResponse(fakeResponse: boolean): void {
    this.response = fakeResponse;
  }
}

export default FakeUrlValidation;
