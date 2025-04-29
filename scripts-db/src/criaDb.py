from colorama import Fore

def criarDataBase(conexao):
    try:
        conexao.autocommit = True
        cursor = conexao.cursor()

        cursor.execute("SELECT 1 FROM pg_database WHERE datname = 'loja'")
        existe = cursor.fetchone()

        if not existe:
            cursor.execute('CREATE DATABASE loja')
            print(f"{Fore.GREEN}Banco de dados 'loja' criado com sucesso!{Fore.RESET}")
        else:
            print(f"{Fore.YELLOW}Banco de dados 'loja' já existe.{Fore.RESET}")
        
        cursor.close()
    except Exception as e:
        print(f"{Fore.RED}Erro ao criar banco de dados | {e}{Fore.RESET}")
