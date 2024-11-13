import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar.jsx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loading from "../../components/Loading.jsx";
import api from "../../services/api.js";
import "./Home.scss";

const Home = () => {
  const [livros, setLivros] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLivros = async () => {
      setLoading(true);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuário não autenticado. Faça login novamente.");
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/livro/userlivros", {
          headers: { Authorization: `Bearer ${token}` },
          params: { page, size: 5 },
        });

        if (response.status === 200) {
          setLivros(response.data.content);
          setTotalPages(response.data.totalPages);
        }
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
        alert("Erro ao carregar livros do usuário.");
      } finally {
        setLoading(false); 
      }
    };

    fetchLivros();
  }, [navigate, page]);

  const handlePreviousPage = () => page > 0 && setPage(page - 1);
  const handleNextPage = () => page < totalPages - 1 && setPage(page + 1);

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <div className="h1"><h2>Meus Livros:</h2></div>
        <div className="linha">
        </div>

        {loading ? (
          <Loading /> 
        ) : (
          <>
            <div className="livros-container1">
              {livros.length === 0 ? (
                <p>Nenhum livro criado no momento .-.</p>
              ) : (
                livros.map((livro) => (
                  <Link
                    to={`/livro/editar/${livro.id}`}
                    key={livro.id}
                    className="livro-card"
                  >
                    <img src={livro.capa} alt={livro.titulo} />
                    <div className="livro-info">
                      <h3>{livro.titulo}</h3>
                      <p>{livro.autor}</p>
                    </div>
                  </Link>
                ))
              )}
            </div>

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

export default Home;
