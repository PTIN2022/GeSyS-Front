import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import jwt from 'jsonwebtoken';
import { PerfilData } from '../pages/admin/perfil';
import { useRouter } from 'next/router';

export const AuthContextProvider = ({ children }: any) => {

  const route = useRouter();

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
      route.push('/admin/')
    }
    else {
      alert('Usuario o contraseña incorrectos')
    }
  }

  const logout = async () => {
    const response = await fetch('/api/logout');
    if (response.status === 200) {
      route.push('/login')
    }
    else {
      alert('Error?')
    }
  }

  const context = {
    login,
    logout
  }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}