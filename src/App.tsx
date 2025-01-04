import { AuthClient } from "@dfinity/auth-client";

function App() {
  const isLocal = _isLocal(location.hostname);
  const identityProvider = isLocal ? `http://by6od-j4aaa-aaaaa-qaadq-cai.localhost:4943/` 
                                   : 'https://identity.ic0.app/';
  const keyType = 'Ed25519';
  let identity = null;
  let principal = '';
  
  async function IILogin() {
    const authClient = await AuthClient.create({ keyType });
    // 
    await new Promise((resolve) => {
        authClient.login({
            identityProvider,
            onSuccess: resolve
        });
    });
    identity = authClient.getIdentity();
    principal = identity.getPrincipal().toString();
    console.log(identity); 
    console.log(principal);
  }

  return (
    <main>
      <button onClick={IILogin}>Login</button>
    </main>
  );
}

export default App;

function _isLocal(str:any) {
  return (str).indexOf('127.0.0.1') != -1 || (str).indexOf('localhost') != -1;
}