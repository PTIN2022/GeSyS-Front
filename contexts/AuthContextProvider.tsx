import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useRouter } from 'next/router';
import { PerfilData } from '../pages/admin/perfil';

const PerfilVacio: PerfilData = {
  token: "",
  username: "",
  pfp: "",
  nombre: "",
  apellido: "",
  telefono: "",
  email: "",
  dni: "",
  cargo: 'Trabajador',
  passw: "",
  question: "",
  estacion: "",
  estado: false,
}

export const AuthContextProvider = ({ children }: any) => {

  const [user, setUser] = useState<PerfilData>(PerfilVacio);

  const route = useRouter();

  // const fetchUserInfo = async () => {
  //   const response = await fetch('/api/user')
  //   if (response.status === 200) {
  //     const data = await response.json()
  //     setUser(data)
  //   }
  //   else {
  //     setUser(PerfilVacio)
  //   }
  // }

  // useEffect(() => {
  //   fetchUserInfo()
  // }, [])

  const login = async (email: string, password: string) => {

    const form = new FormData();
    form.append("email", email);
    form.append("password", password);

    const response = await fetch('http://craaxkvm.epsevg.upc.es:23601/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: form
    })
    if (response.status === 200) {
      // await fetchUserInfo()
      route.push('/admin/')
    }
    else {
      alert('Usuario o contraseña incorrectos')
    }
  }

  const logout = async () => {
    setUser(PerfilVacio)
    route.push('/login')
  }

  const requestAuthenticated = async (url: string, options?: any) => {

    let token = user.token

    if (!token) {
      setUser(PerfilVacio)
      return;
    }

    try {
      const response = fetch(url, {
        headers: {
          'x-access-tokens': token
        },
        ...options
      })
  
      return response;
    }
    catch (error) {
      alert(error)
      console.log(error)
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