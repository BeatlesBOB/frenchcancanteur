import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './components/04 - Templates/Login/Login'
import Register from './components/04 - Templates/Register/Register'
import Auth from './components/04 - Templates/Auth/Auth'
import { FirebaseProvider } from './contexts/FirebaseContext'
import { UserProvider } from './contexts/UserContext'
import './App.scss'

import Home from './pages/Home/Home'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Auth />}>
                <Route index element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Route>
              <Route path='/home' element={<Home />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </FirebaseProvider>
    </QueryClientProvider>
  )
}

export default App
