import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useRouter } from 'next/router';
import { PerfilData } from '../pages/admin/perfil';
import { PerfilVacio } from '../pages/api/user';

export const AuthContextProvider = ({ children }: any) => {

  const [user, setUser] = useState<PerfilData>(PerfilVacio);

  const route = useRouter();

  const fetchUserInfo = async () => {
    const response = await fetch('/api/user')
    if (response.status === 200) {
      const data = await response.json()
      setUser(data)
    }
    else {
      setUser(PerfilVacio)
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const login = async (username: string, password: string) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    if (response.status === 200) {
      await fetchUserInfo();
      route.push('/admin/')
    }
    else {
      alert('Usuario o contraseña incorrectos')
    }
  }

  const logout = async () => {
    const response = await fetch('/api/logout');
    setUser(PerfilVacio)
    if (response.status === 200) {
      route.push('/login')
    }
    else {
      alert('Error?')
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}