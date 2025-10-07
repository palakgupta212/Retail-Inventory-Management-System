import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Login from './components/Login';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('token')||null);
  if(!token) return <Login onLogin={(t)=>{localStorage.setItem('token',t); setToken(t);}} />;
  return (<div className="container mt-4"><h2>Retail Inventory Dashboard</h2><ProductList token={token} onLogout={() => { localStorage.removeItem('token'); setToken(null); }} /></div>);
}
