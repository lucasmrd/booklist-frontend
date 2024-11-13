import React, { useState } from "react";
import { Sidebar } from "../../components/Sidebar.jsx";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js"
import "./AddLivro.scss";

const AddLivro = ({ addLivro }) => {
  const [title, setTitle] = useState("");
  const [capa, setCapa] = useState("");
  const [autor, setAutor] = useState("");
  const [sinopse, setSinopse] = useState("");
  const navigate = useNavigate();

  const handleAddLivro = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Usuário não autenticado. Faça login novamente.");
      navigate("/login");
      return;
    }

    try {
      const response = await api.post(
        "/livro",
        {
          titulo: title,
          capa: capa,
          autor: autor,
          sinopse: sinopse,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      alert("Erro ao adicionar livro. Tente novamente.");
    }
  };

  return (
    <>
      <Sidebar />
      <section className="addlivro-section">
        <div className="container11">
        <div className="text">Adicionar Livro</div>
          <form onSubmit={handleAddLivro}>
            <div className="form-group">
              <label htmlFor="title">Título:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Adicione o título do livro..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="capa">URL da Capa:</label>
              <input
                type="text"
                id="capa"
                value={capa}
                onChange={(e) => setCapa(e.target.value)}
                placeholder="URL da imagem da capa..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="autor">Autor:</label>
              <input
                type="text"
                id="autor"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder="Nome do autor..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="sinopse">Sinopse:</label>
              <textarea
                id="sinopse"
                value={sinopse}
                onChange={(e) => setSinopse(e.target.value)}
                placeholder="Escreva uma breve sinopse..."
                required
              ></textarea>
            </div>
            <button type="submit" className="button1">
              Criar Livro
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddLivro;
