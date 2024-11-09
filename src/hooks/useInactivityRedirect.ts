import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Este hook es para redirecciones en Next.js

const useInactivityRedirect = (timeout: number) => {
  const router = useRouter();

  useEffect(() => {
    const handleActivity = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        alert('Se cerró su sesión por inactividad.'); // mensaje para el usuario
        router.push('/auth/sign-in'); //Apunto a donde va
      }, timeout);
    };

    let timer: NodeJS.Timeout;
    
    // Escucha eventos de actividad
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    
    // Inicia el temporizador
    handleActivity();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [router, timeout]);
};

export default useInactivityRedirect;
