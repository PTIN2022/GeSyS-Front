import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useRouter } from 'next/router';
import { PerfilData } from '../pages/admin/perfil';

const PerfilVacio: PerfilData = {
	apellido: "",
	cargo: "trabajador",
	dni: "",
	email: "",
	estado: "",
	foto: "",
	id_estacion: 0,
	id_trabajador: 0,
	id_usuari: 0,
	nombre: "",
	question: "",
	telefono: "",
	token: "",
	type: "",
	ultimo_acceso: new Date(),
	username: ""
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
      const res = await fetch('https://craaxkvm.epsevg.upc.es:23600/api/login', {
        "method": "POST",
        body: form,
        "headers": {
          "accept": "application/json"
        }
      });
      const data = await res.json()

      if (res.status == 200 && data.token != undefined) {
        document.cookie = `token=${data.token};`
        setUser(data)
        route.push('/admin')
      }
      else {
        alert('Error')
        console.log(data)
      }
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
    const response = await requestAuthenticated('https://craaxkvm.epsevg.upc.es:23600/api/token', "")

    if (!response) {
      logout()
      return;
    }

    const data = await response.json() as PerfilData

    if (response.status === 200 && data.dni != '' && data.dni != undefined) {
      setUser(data)
    }
    else {
      setUser(PerfilVacio)
      logout()
      return
    }
  }

  useEffect(() => {
    fetchUserInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const requestAuthenticated = async (url: string, contentType?:string, options?: any) => {

    let token = getCookie('token')

    if (!token) {
      setUser(PerfilVacio)
      return;
    }

    try {
      const response = fetch(url, {
        headers: {
          'x-access-tokens': token,
          'Content-Type': contentType == undefined ? "" : contentType
        },
        ...options
      })
  
      return response;
    }
    catch (error) {
      alert(error)
    }

  }

  const requestAuthenticatedForm = async (url: string,method: string, form:any) => {
    let token = getCookie('token')

    if (!token) {
      setUser(PerfilVacio)
      return;
    }

    try {
      // const response = fetch(url, {
      //   headers: {
      //     'x-access-tokens': token,
      //     'Content-Type': contentType == undefined ? "" : contentType
      //   },
      //   ...options
      // })
      const request = new XMLHttpRequest();
      //request.withCredentials = true;
      request.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
        }
      });
      request.open(method, url);
      request.setRequestHeader('x-access-tokens', token);
      request.setRequestHeader("accept", "application/json");
      
      request.send(form);
      return request
      //const xhr = new XMLHttpRequest();
//xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function () {
//   if (this.readyState === this.DONE) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("POST", "https://craaxkvm.epsevg.upc.es:23600/api/clientes");
// xhr.setRequestHeader("accept", "application/json");
// xhr.setRequestHeader("x-access-tokens", token);

// xhr.send(form);
//       return xhr;
      // return (request.onload = function() {
      //     if (request.status != 200) { // analyze HTTP status of the response
      //       alert(`Error ${request.status}: ${request.statusText}`); // e.g. 404: Not Found
      //     };
      //   })
       
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
      requestAuthenticatedForm,
      
      fetchUserInfo
    }}>
      {children}
    </AuthContext.Provider>
  )
}