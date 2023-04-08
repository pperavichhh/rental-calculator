import { useRouter } from 'next/router';
import { useState } from 'react';
import React, { useEffect } from 'react';
import '..//src/app/style.css';
import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';


function LoginPage() {
    useEffect(() => {
        document.title = 'Login';
      }, []);
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    const myUsername = 'jeab01';
    const myPassword = 'Jeab08112517';
    const myUsername2 = 'shane02';
    const myPassword2 = 'Shane18072517';
    const myUsername3 = 'manu03'
    const myPassword3 = 'Manu27012551';
    if (username === myUsername && password === myPassword || username === myUsername2 && password === myPassword2 ||username === myUsername3 && password === myPassword3 ) {
      router.push('/rent-calculation');
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' ,fontFamily:'Kanit , sans-serif'}}>
        <h1 style={{ marginBottom: '1rem' }}>Login</h1>
        <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button style={{ marginBottom: '1rem' }} onClick={handleLogin}>Login</button>
  </div>
  
  );
}
export default LoginPage;
