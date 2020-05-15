import {} from 'express';

class HttpError {
  constructor(public readonly message: string, public readonly status = 400) {}
}

export default HttpError;
