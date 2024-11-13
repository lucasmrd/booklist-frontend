import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";
import "./EditarLivro.scss";

const EditarLivro = () => {
  const { livroId } = useParams();
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [livroEditado, setLivroEditado] = useState({
    titulo: "",
    autor: "",
    sinopse: "",
    capa: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLivro = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Usuário não autenticado. Faça login novamente.");
          navigate("/login");
          return;
        }

        const response = await api.get(`/livro/${livroId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setLivro(response.data);
          setLivroEditado(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar livro:", error);
        alert("Erro ao carregar os detalhes do livro.");
      } finally {
        setLoading(false);
      }
    };

    fetchLivro();
  }, [livroId, navigate]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Usuário não autenticado. Faça login novamente.");
      navigate("/login");
      return;
    }

    try {
      const response = await api.delete(`/livro/${livro.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        alert("Livro apagado com sucesso.");
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao apagar livro:", error);
      alert("Erro ao apagar o livro.");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLivroEditado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Usuário não autenticado. Faça login novamente.");
      navigate("/login");
      return;
    }

    try {
      const response = await api.put(
        `/livro/${livroId}`,
        livroEditado,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Livro atualizado com sucesso!");
        setLivro(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Erro ao salvar alterações.");
    }
  };

  const toggleReadStatus = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Usuário não autenticado. Faça login novamente.");
      navigate("/login");
      return;
    }

    try {
      const response = await api.put(
        `/livro/${livroId}/lido`,
        { lido: !livro.lido },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setLivro((prev) => ({ ...prev, lido: !prev.lido }));
      }
    } catch (error) {
      console.error("Erro ao atualizar status de leitura:", error);
      alert("Erro ao atualizar status de leitura.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!livro) {
    return <p>Livro não encontrado!</p>;
  }

  return (
    <>
      <Sidebar />
      <section className="editar-livro-section">
        <div className="container7">
          <button onClick={() => navigate("/home")} className="button-back">
          <FaArrowLeft /> Voltar
          </button>
          <div className="editar-livro">
            <img src={livro.capa} alt={livro.titulo} />
            <div className="livro-detalhe-info">
            <h2><strong>Título:</strong> {isEditing ? (
                <input
                  type="titulo"
                  name="titulo"
                  value={livroEditado.titulo}
                  onChange={handleInputChange}
                />
              ) : livro.titulo}</h2>
              <h2><strong>Autor:</strong> {isEditing ? (
                <input
                  type="text"
                  name="autor"
                  value={livroEditado.autor}
                  onChange={handleInputChange}
                />
              ) : livro.autor}</h2>
              
             <p><strong>Sinopse:</strong> {isEditing ? (
                <textarea 
                  name="sinopse"
                  value={livroEditado.sinopse}
                  onChange={handleInputChange}
                />  
              ) : livro.sinopse}</p>
            </div>

          </div>
          <div className="button-group">
  <div className="button-left-group">
    <button
      onClick={toggleReadStatus}
      className={`button-read-status ${livro.lido ? 'lido' : 'nao-lido'}`}
    >
      {livro.lido ? "Lido" : "Não Lido"}
    </button>
    <button onClick={toggleEdit} className="button-read">
      {isEditing ? "Cancelar " : "Editar Livro"}
    </button>
    {isEditing && (
      <button onClick={handleSaveChanges} className="button-save">
        Salvar
      </button>
    )}
  </div>
  <button onClick={handleDelete} className="button-delete">
    Apagar Livro
  </button>
</div>


        </div>
      </section>
    </>
  );
};

export default EditarLivro;
