import * as vscode from 'vscode';
/**
 * Creates a recursive proxy that builds a method path and executes an RPC call.
 * @param pathParts The parts of the path collected so far (e.g., ['commands']).
 */
function createApiProxy(pathParts: string[] = []): any {
  // The trick is to proxy a function object.
  // This allows the final result to be callable, triggering the `apply` trap.
  const target = () => {};

  return new Proxy(target, {
    /**
     * Handles property access, e.g., `api.commands`
     */
    get(target, prop: string, receiver) {
      // Avoid proxying special properties
      if (typeof prop === 'symbol' || prop === 'then' || prop === 'inspect') {
        return undefined;
      }
      
      // Recursively create a new proxy for the next level, adding the new property to the path
      const newPath = [...pathParts, prop];
      return createApiProxy(newPath);
    },

    /**
     * Handles the function call, e.g., `executeCommand(...)`
     */
    apply(target, thisArg, args) {
      // Join the collected path parts to form the final RPC method name
      const method = pathParts.join('.');
      
      // Make the actual RPC request
      return rpc.request(method, args);
    },
  });
}

// Create the root of your API and cast it to your VscodeApi interface
export const api: typeof vscode = createApiProxy();