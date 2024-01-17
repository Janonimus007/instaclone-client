import { ApolloProvider } from "@apollo/client"
import client from "./config/apollo"
import { ToastContainer } from "react-toastify"
import { useEffect, useMemo, useState } from 'react';
import Auth from './pages/Auth';
import { getToken } from "./utils/token";
import AuthContext from "./context/AuthContext";
import Home from "./pages/Home"

function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken()
    token ? setAuth(token) : setAuth(null);
  }, []);


  const logout = () => {
    console.log('cerrar sesion');
  }

  const setUser = (user) => {
    setAuth(user)
  }

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser
    }), [auth]
  )

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Home />}
        <ToastContainer
          position="top-center"
          hideProgressBar
          autoClose={4500}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider >

    </ApolloProvider>

  );
}

export default App;
