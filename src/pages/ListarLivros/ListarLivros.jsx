import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { Sidebar } from "../../components/Sidebar.jsx";
import "./ListarLivros.scss";

const ListarLivros = () => {
  const [livros, setLivros] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivros = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Usuário não autenticado. Faça login novamente.");
        return;
      }

      try {
        const response = await api.get("/livro", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { page, size: 5 },
        });

        if (response.status === 200) {
          setLivros(response.data.content);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
        alert("Erro ao carregar livros.");
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, [page]);

  const handlePreviousPage = () => page > 0 && setPage(page - 1);
  const handleNextPage = () => page < totalPages - 1 && setPage(page + 1);


  const livrosPorUsuario = livros.reduce((acc, livro) => {
    const { userName } = livro;
    if (!acc[userName]) {
      acc[userName] = [];
    }
    acc[userName].push(livro);
    return acc;
  }, {});

  return (
<>
   
   <Sidebar />

    <section className="listaLivro-section">
      <div className="linha">
        <div className="mybook">
          <h2>Livros de outros usuários:</h2>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          {Object.keys(livrosPorUsuario).map((usuario) => (
            <div key={usuario} className="usuario-livros">
              <h3 className="usuario-nome">{usuario}</h3>
              <div className="livros-container">
                {livrosPorUsuario[usuario].map((livro) => (
                  <Link
                    to={`/livro/detalhe/${livro.id}`}
                    key={livro.id}
                    className="livro-card"
                  >
                    <img src={livro.capa} alt={livro.titulo} />
                    <div className="livro-info">
                      <h3>{livro.titulo}</h3>
                      <p>{livro.autor}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 0}>
              <FaArrowLeft />
            </button>
            <span>
              Página {page + 1} de {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={page === totalPages - 1}>
              <FaArrowRight />
            </button>
          </div>
        </>
      )}
    </section>
    </>
  );
};

export default ListarLivros;
