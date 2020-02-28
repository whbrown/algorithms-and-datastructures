export default class IndexError extends Error {
  constructor(message: string = "") {
    super(message);
    this.name = 'IndexError';
  }
}