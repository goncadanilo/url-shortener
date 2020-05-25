export default interface IUrlRepository {
  create(originalUrl: string): Promise<string>;
  findByShortenUrl(shortUrl: string): Promise<string | undefined>;
}
