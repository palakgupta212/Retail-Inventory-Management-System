import React, { useState } from 'react';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export default function Login({ onLogin }){
  const [email,setEmail]=useState('admin@example.com'); const [password,setPassword]=useState('password');
  async function submit(e){ e.preventDefault(); const res = await fetch(`${API}/auth/login`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password})}); const data = await res.json(); if(data.token) onLogin(data.token); else alert(data.message || 'Login failed'); }
  return (<div className="card mx-auto" style={{maxWidth:420}}><div className="card-body"><h4>Login</h4><form onSubmit={submit}><div className="mb-2"><input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" /></div><div className="mb-2"><input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" /></div><button className="btn btn-primary">Login</button></form></div></div>);
}
