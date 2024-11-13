import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { Sidebar } from "../../components/Sidebar.jsx";
import { FaArrowLeft } from "react-icons/fa";
import "./LivroDetalhe.scss";

const LivroDetalhe = () => {
  const { livroId } = useParams();
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivro = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Usuário não autenticado. Faça login novamente.");
        return;
      }

      try {
        const response = await api.get(`/livro/${livroId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setLivro(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar o livro:", error);
        alert("Erro ao carregar o livro.");
      } finally {
        setLoading(false);
      }
    };

    fetchLivro();
  }, [livroId]);

  if (loading) {
    return <Loading />;
  }

  if (!livro) {
    return <p>Livro não encontrado!</p>;
  }

  return (
    <>
      <Sidebar />
      <section className="livrodetalhe-section">
        <div className="container10">
          <Link to="/home" className="button-back">
            <FaArrowLeft /> Voltar
          </Link>
          <div className="livrodetalhe-content">
            <img src={livro.capa} alt={livro.titulo} className="livrodetalhe-capa" />
            <div className="livrodetalhe-info">
              <h1>Adicionado por: {livro.userName}</h1>
              <h3><strong>Título:</strong> {livro.titulo}</h3>
              <h3><strong>Autor:</strong> {livro.autor}</h3>
              <p><strong>Sinopse:</strong> {livro.sinopse}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LivroDetalhe;
