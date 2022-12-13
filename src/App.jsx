import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Auth from './components/04 - Templates/Auth/Auth'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import { AuthProvider } from './contexts/AuthContext'
import './App.scss'
import Main from './components/04 - Templates/Main/Main'


const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
         <AuthProvider>
          <Routes>
            <Route path='/' element={<Auth />}>
              <Route index element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
            <Route path='/' element={<Main />}>
              <Route path='/home' element={<Home />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
