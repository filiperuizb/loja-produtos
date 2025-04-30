from colorama import Fore

def criarTabelas(conexao):
    try:
        cursor = conexao.cursor()

        cursor.execute('CREATE SCHEMA IF NOT EXISTS usuario;')
        cursor.execute('CREATE SCHEMA IF NOT EXISTS produtos;')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS produtos.produtos (
                idkey SERIAL PRIMARY KEY,
                nome VARCHAR(255),
                descricao TEXT,
                preco NUMERIC(12, 2),
                estoque INT,
                datacriacao TIMESTAMP
            );
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS usuario.usuario (
                idkey SERIAL PRIMARY KEY,
                nome VARCHAR(255),
                cpf VARCHAR(11),
                email VARCHAR(255) UNIQUE,
                senha VARCHAR(255),
                datacriacao TIMESTAMP
            );
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS usuario.endereco_usuario (
                idkey SERIAL PRIMARY KEY,
                usuario_idkey INT,
                logradouro VARCHAR(255),
                numero VARCHAR(20),
                complemento VARCHAR(255),
                bairro VARCHAR(255),
                cidade VARCHAR(255),
                estado VARCHAR(2),
                cep VARCHAR(10),
                datacriacao TIMESTAMP,
                CONSTRAINT fk_usuario_idkey_endereco FOREIGN KEY (usuario_idkey)
                    REFERENCES usuario.usuario(idkey)
                    ON DELETE CASCADE
            );
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS usuario.carrinho_usuario (
                idkey SERIAL PRIMARY KEY,
                usuario_idkey INT NOT NULL,
                produto_idkey INT NOT NULL,
                quantidade INT NOT NULL,
                data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_usuario_idkey_carrinho FOREIGN KEY (usuario_idkey)
                    REFERENCES usuario.usuario(idkey)
                    ON DELETE CASCADE,
                CONSTRAINT fk_produto_idkey_carrinho FOREIGN KEY (produto_idkey)
                    REFERENCES produtos.produtos(idkey)
                    ON DELETE CASCADE
            );
        ''')

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS usuario.compras_usuario (
                idkey SERIAL PRIMARY KEY,
                usuario_idkey INT,
                produto_idkey INT,
                quantidade INT,
                data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                total NUMERIC(10, 2),
                CONSTRAINT fk_usuario_idkey_compras FOREIGN KEY (usuario_idkey)
                    REFERENCES usuario.usuario(idkey)
                    ON DELETE CASCADE,
                CONSTRAINT fk_produto_idkey_compras FOREIGN KEY (produto_idkey)
                    REFERENCES produtos.produtos(idkey)
            );
        ''')

        conexao.commit()
        cursor.close()
        print(f"{Fore.GREEN}Schemas e tabelas criados com sucesso!")

    except Exception as e:
        print(f"{Fore.RED}Erro ao criar tabelas | {e}")
