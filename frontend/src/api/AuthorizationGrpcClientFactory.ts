// Intercepts all requests to methods on the grpc client and
// adds site-wide headers to the second argument.
//

export default class AuthorizedGrpcClientClient<T> {
  public readonly client: T

  constructor(client: { new (arg1: any, arg2: any, arg3: any): T }) {
    const c = new client('http://0.0.0.0:8080', null, null)
    this.client = this.mapMetadata(c)
  }

  private mapMetadata<TClient>(client: TClient): TClient {
    for (const prop in client) {
      if (typeof client[prop] !== 'function') {
        continue
      }

      const original = (client[prop] as unknown) as Function
      client[prop] = ((...args: any[]) => {
        args[1] = {
          ...args[1],
          // authorization: `Bearer ${getTokenCookie()}`,
        }
        return original.call(client, ...args)
      }) as any
    }
    return client
  }
}
