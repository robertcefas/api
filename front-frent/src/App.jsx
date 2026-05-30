import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify' // Importação adicionada
import 'react-toastify/dist/ReactToastify.css' // CSS adicionado

import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CadastroPage from './pages/CadastroPage'
import ListaAlunoPage from './pages/ListaAlunosPage'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/cadastro' element={<CadastroPage />} />
          <Route path='/lista' element={<ListaAlunoPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer autoClose={3000} />
    </>
  )
}

export default App