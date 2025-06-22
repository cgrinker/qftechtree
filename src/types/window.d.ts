


interface RpcClient {
    request: (method: string, args: any[]) => Promise<any>;
}


interface Window {
  rpc: RpcClient;
  anotherMethod?: (arg: string) => number;
}

declare const rpc: typeof window.rpc;