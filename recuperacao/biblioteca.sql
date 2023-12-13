-- Criar o banco de dados
CREATE DATABASE Biblioteca;
USE Biblioteca;

-- Tabela Autor
CREATE TABLE Autor (
    AutorID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela Editora
CREATE TABLE Editora (
    EditoraID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Localizacao VARCHAR(100) NOT NULL
);

-- Tabela Livro
CREATE TABLE Livro (
    LivroID INT PRIMARY KEY AUTO_INCREMENT,
    Titulo VARCHAR(100) NOT NULL,
    AnoPublicacao INT NOT NULL,
    ISBN VARCHAR(20) UNIQUE NOT NULL,
    EditoraID INT,
    FOREIGN KEY (EditoraID) REFERENCES Editora(EditoraID)
);

-- Tabela Gênero
CREATE TABLE Genero (
    GeneroID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(50) NOT NULL
);

-- Tabela LivroGenero (relação n-m entre Livro e Genero)
CREATE TABLE LivroGenero (
    LivroID INT,
    GeneroID INT,
    PRIMARY KEY (LivroID, GeneroID),
    FOREIGN KEY (LivroID) REFERENCES Livro(LivroID),
    FOREIGN KEY (GeneroID) REFERENCES Genero(GeneroID)
);

-- Tabela Usuário
CREATE TABLE Usuario (
    UsuarioID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL
);

-- Tabela Empréstimo
CREATE TABLE Emprestimo (
    EmprestimoID INT PRIMARY KEY AUTO_INCREMENT,
    DataEmprestimo DATE NOT NULL,
    DataDevolucao DATE NOT NULL,
    LivroID INT,
    UsuarioID INT,
    FOREIGN KEY (LivroID) REFERENCES Livro(LivroID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
);

-- Tabela Reserva
CREATE TABLE Reserva (
    ReservaID INT PRIMARY KEY AUTO_INCREMENT,
    DataReserva DATE NOT NULL,
    LivroID INT,
    UsuarioID INT,
    FOREIGN KEY (LivroID) REFERENCES Livro(LivroID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
);

-- Tabela LivroAutor (relação n-m entre Livro e Autor)
CREATE TABLE LivroAutor (
    LivroID INT,
    AutorID INT,
    PRIMARY KEY (LivroID, AutorID),
    FOREIGN KEY (LivroID) REFERENCES Livro(LivroID),
    FOREIGN KEY (AutorID) REFERENCES Autor(AutorID)
);

-- Tabela LivroUsuario (relação n-m entre Livro e Usuario)
CREATE TABLE LivroUsuario (
    LivroID INT,
    UsuarioID INT,
    PRIMARY KEY (LivroID, UsuarioID),
    FOREIGN KEY (LivroID) REFERENCES Livro(LivroID),
    FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID)
);

