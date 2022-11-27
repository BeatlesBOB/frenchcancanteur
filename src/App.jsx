import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Auth from './pages/Auth/Auth'
import './App.scss'
import { FirebaseProvider } from './contexts/FirebaseContext'
import { UserProvider } from './contexts/UserContext'
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
