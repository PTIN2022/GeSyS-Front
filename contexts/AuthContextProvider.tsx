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
  question: "",
  estacion: "",
  estado: false,
}

// Given a cookie key `name`, returns the value of
// the cookie or `null`, if the key is not found.
const getCookie = (name: string): string | null => {
	const nameLenPlus = (name.length + 1);
	return document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(cookie => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map(cookie => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0] || null;
}

const deleteAllCookies = () => {
  document.cookie.split(";").forEach((c) => { 
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
  }); 
}

export const AuthContextProvider = ({ children }: any) => {

  const [user, setUser] = useState<PerfilData>(PerfilVacio);

  const route = useRouter()

  const login = async (email: string, password: string) => {

    const form = new FormData();
    form.append("email", email);
    form.append("password", password);

    try {
      const res = await fetch('http://craaxkvm.epsevg.upc.es:23601/api/login', {
        "method": "POST",
        body: form,
        "headers": {
          "accept": "application/json"
        }
      });
      const data = await res.json()
      document.cookie = `token=${data.token};`
      setUser(data)
      route.push('/admin')
    } catch (err) {
      alert(err)
    }

  }

  const logout = () => {
    deleteAllCookies()
    setUser(PerfilVacio)
    route.push('/login')
  }

  const fetchUserInfo = async () => {
    const response = await requestAuthenticated('http://craaxkvm.epsevg.upc.es:23601/api/token')

    if (!response) {
      return;
    }

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const requestAuthenticated = async (url: string, options?: any) => {

    let token = getCookie('token')

    console.log(token)

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
      logout,
      requestAuthenticated,
      fetchUserInfo
    }}>
      {children}
    </AuthContext.Provider>
  )
}