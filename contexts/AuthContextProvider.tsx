import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import jwt from 'jsonwebtoken';
import { PerfilData } from '../pages/admin/perfil';

export const AuthContextProvider = ({ children }: any) => {

  const [ user, setUser ] = useState<PerfilData | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    console.log('user', user)
    if (user) {
      const userInfo = jwt.decode(user) as PerfilData
      setUser(userInfo)
    }
  }, [])

  const login = async (username: string, password: string): Promise<number> => {
    if (username !== '' && password !== '') {
      try {
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
        const data = await response.json()
        if (response.status === 200) {
          setUser(data.token)
          localStorage.setItem('user', data.token)
          return response.status
        }
        else {
          return response.status
        }
      }
      catch (error) {
        return 400
      }
    }
    else {
      return 400
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
  }

  const context = {
    user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}