import { useContext, useState } from 'react';
import { authJwtRequest } from '@/utils/axiosRequests';
import { UserContext } from './authContext';

function useAuthRequest() {
  const {setAuthJWT, setUser} = useContext(UserContext)
  const verifyToken = async ():Promise<boolean> => {
    const jwtToken = localStorage.getItem('psf-jwt')
    if (jwtToken) {
      try {
        const authorized = await authJwtRequest(jwtToken)
        if (authorized) {
          setAuthJWT(true)
          return true
        } else {
          localStorage.setItem('psf-jwt', '');
          setAuthJWT(false)
          setUser(null)
          return false
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.setItem('psf-jwt', '');
        setUser(null)
        setAuthJWT(false)
        return false
      }
    } else {
        localStorage.setItem('psf-jwt', '');
        setAuthJWT(false)
        return false
    }
  };



  return {
    verifyToken
  };
}

export default useAuthRequest;