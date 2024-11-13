import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Cadastro.scss";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user", {
        nome: name,
        email: email,
        senha: password,
      });

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <section className="cadastro-section">
      <div className="container">
        <div className="intro">
          <img
            src="https://cnm.org.br/cms/images/stories/comunicacao_novo/educacao/05012016_livros_MRE.jpg"
            alt="Introdução"
            className="intro-image"
          />
          <h2 className="bx bx-book">Bem-vindo ao BookList</h2>
          <p>
            Cadastre-se agora, adicione seus livros favoritos, descubra novos títulos e mantenha-se sempre atualizado com as últimas novidades literárias!
          </p>
        </div>
        <div className="form">
          <h2>Cadastro</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome..."
                required
              />
            </div>
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
            <button type="submit" className="button">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Cadastro;
