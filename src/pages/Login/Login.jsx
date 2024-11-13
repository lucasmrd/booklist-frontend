import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Login.scss";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  const handleLoginClick = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await api.post("/login", {
          email,
          password,
        });

        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          onLogin();
          navigate("/home");
        }
      } catch (error) {
        console.error("Erro ao realizar login:", error);
        alert("Erro ao conectar ao servidor.");
      }
    } else {
      alert("Por favor, preencha ambos os campos.");
    }
  };

  const handleRegisterClick = () => {
    navigate("/Cadastro"); 
  };

  return (
    <section className="login-section">
      <div className="container">
        <div className="intro">
          <img
            src="https://cnm.org.br/cms/images/stories/comunicacao_novo/educacao/05012016_livros_MRE.jpg"
            alt="Introdução"
            className="intro-image"
          />
          <h2 className="bx bx-book"> Bem-vindo ao BookList</h2>
          <p>
            Acesse sua conta para gerenciar sua lista de livros favoritos.
            Explore novos títulos, adicione livros e mantenha-se atualizado!
          </p>
        </div>

        <div className="form">
          <form className="login-form">
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </div>

            <div className="button-group">
              <button type="submit" onClick={handleLoginClick} className="button1">
                Login
              </button>
              <button type="button" onClick={handleRegisterClick} className="button2">
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
