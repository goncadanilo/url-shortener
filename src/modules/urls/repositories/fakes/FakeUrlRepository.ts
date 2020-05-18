import IUrlRepository from '../IUrlRepository';

class FakeUrlRepository implements IUrlRepository {
  public async create(): Promise<string> {
    return Math.random().toString(36).substring(2, 8);
  }
}

export default FakeUrlRepository;
