import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home/Home.jsx";
import AddLivro from "./pages/AddLivro/AddLivro.jsx";
import Login from "./pages/Login/Login.jsx";
import Config from "./pages/Config/Config.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx";
import EditarLivro from "./pages/EditarLivro/EditarLivro.jsx";
import ListarLivros from "./pages/ListarLivros/ListarLivros.jsx";
import LivroDetalhe from "./pages/LivroDetalhe/LivroDetalhe.jsx";
import PerfilUsuario from "./pages/PerfilUsuario/PerfilUsuario.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [livros, setLivros] = useState([]);  // Estado para armazenar os livros

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const addLivro = (livro) => {
    setLivros([...livros, { ...livro, isRead: false, id: Date.now() }]);  // Adiciona o livro com o campo isRead
  };

  const deleteLivro = (livroId) => {
    setLivros(livros.filter((livro) => livro.id !== livroId));  // Remove o livro com o id correspondente
  };

  const toggleReadStatus = (livroId) => {
    setLivros(livros.map((livro) =>
      livro.id === livroId ? { ...livro, isRead: !livro.isRead } : livro
    ));  // Atualiza o estado de "isRead" do livro
  };

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/Home" /> : <Login onLogin={handleLogin} />}
        />
        
        {/* Rotas protegidas */}
        <Route
          path="/AddLivro"
          element={isAuthenticated ? <AddLivro addLivro={addLivro} /> : <Navigate to="/" />}
        />
        <Route
          path="/Home"
          element={isAuthenticated ? <Home livros={livros} /> : <Navigate to="/" />}
        />
        <Route
          path="/Config"
          element={isAuthenticated ? <Config /> : <Navigate to="/" />}
        />
        <Route
          path="/livro/editar/:livroId"
          element={isAuthenticated ? <EditarLivro livros={livros} toggleReadStatus={toggleReadStatus} deleteLivro={deleteLivro} /> : <Navigate to="/" />}
        />
        <Route path="/Cadastro" element={<Cadastro />} />

        {/* Nova rota para ListarLivros */}
        <Route
          path="/ListarLivros"
          element={isAuthenticated ? <ListarLivros livros={livros} /> : <Navigate to="/" />}
        />

        <Route path="/PerfilUsuario" element={<PerfilUsuario />} />

        <Route path="/livro/detalhe/:livroId" element={<LivroDetalhe />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;