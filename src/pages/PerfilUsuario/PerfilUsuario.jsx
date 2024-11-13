import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { Sidebar } from "../../components/Sidebar";
import "./PerfilUsuario.scss";

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState({
    nome: "",
    email: "",
    senha: "",  // Campo para edição da senha
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Usuário não autenticado. Faça login novamente.");
        navigate("/login");
        return;
      }

      try {
        const response = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUsuario(response.data);
          setUsuarioEditado({ nome: response.data.nome, email: response.data.email, senha: "" });
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do usuário:", error);
        alert("Erro ao carregar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado((prev) => ({
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
        `/user/${usuario.id}`,
        usuarioEditado, // Inclui nome, email e senha
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Perfil atualizado com sucesso!");
        setUsuario(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Erro ao salvar alterações do perfil:", error);
      alert("Erro ao salvar alterações do perfil.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!usuario) {
    return <p>Usuário não encontrado!</p>;
  }

  return (
    <>
      <Sidebar />
      <section className="perfilusuario-section">
        <div className="container12">
          <h2>Perfil do Usuário</h2>
          <div className="perfilusuario-info">
            {isEditing ? (
              <>
                <p><strong>Nome:</strong> 
                  <input 
                    type="text" 
                    name="nome" 
                    value={usuarioEditado.nome} 
                    onChange={handleInputChange} 
                  />
                </p>
                <p><strong>Email:</strong> 
                  <input 
                    type="email" 
                    name="email" 
                    value={usuarioEditado.email} 
                    onChange={handleInputChange} 
                  />
                </p>
                <p><strong>Senha:</strong> 
                  <input 
                    type="password" 
                    name="senha" 
                    value={usuarioEditado.senha} 
                    onChange={handleInputChange} 
                    placeholder="Digite uma nova senha"
                  />
                </p>
                <button onClick={handleSaveChanges} className="button-save">
                  Salvar Alterações
                </button>
                <button onClick={() => setIsEditing(false)} className="button-cancel">
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <p><strong>Nome:</strong> {usuario.nome}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <button onClick={() => setIsEditing(true)} className="button-edit">
                  Editar Perfil
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default PerfilUsuario;
