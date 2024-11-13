import React, { createContext, useState, useContext } from "react";

const BooksContext = createContext();

// Provedor do contexto
export const BooksProvider = ({ children }) => {
  const [livros, setLivros] = useState([]); // Estado para armazenar os livros

  // Função para adicionar um livro
  const adicionarLivro = (livro) => {
    setLivros((prevLivros) => [...prevLivros, livro]);
  };

  return (
    <BooksContext.Provider value={{ livros, adicionarLivro }}>
      {children}
    </BooksContext.Provider>
  );
};

// Hook para acessar os dados do contexto
export const useBooks = () => {
  return useContext(BooksContext);
};
