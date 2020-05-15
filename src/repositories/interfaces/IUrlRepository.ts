export default interface IUrlRepository {
  create(originalUrl: string): Promise<string>;
}
