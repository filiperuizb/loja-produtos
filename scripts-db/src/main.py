import os
from colorama import Fore
from criaDb import criarDataBase
from criarTable import criarTabelas
from conexao import conectarBanco

def linhaSeparadora():
    print(f"{Fore.LIGHTBLACK_EX}" + "-" * 90 + f"{Fore.RESET}")

def exibirMenu():
    os.system('cls' if os.name == 'nt' else 'clear')  

    print(f"{Fore.CYAN}")
    print(r""" 
___       ________        ___  ________                             ________  ________     
|\  \     |\   __  \      |\  \|\   __  \                           |\   ___ \|\   __  \    
\ \  \    \ \  \|\  \     \ \  \ \  \|\  \        ____________      \ \  \_|\ \ \  \|\ /_   
 \ \  \    \ \  \\\  \  __ \ \  \ \   __  \      |\____________\     \ \  \ \\ \ \   __  \  
  \ \  \____\ \  \\\  \|\  \\_\  \ \  \ \  \     \|____________|      \ \  \_\\ \ \  \|\  \ 
   \ \_______\ \_______\ \________\ \__\ \__\                          \ \_______\ \_______\
    \|_______|\|_______|\|________|\|__|\|__|                           \|_______|\|_______|
    """)
    print(f"{Fore.RESET}")
    
    linhaSeparadora()
    print(f"{Fore.MAGENTA}[ 1 ] {Fore.CYAN}Criar Banco de Dados {Fore.MAGENTA}(loja)")
    print(f"{Fore.MAGENTA}[ 2 ] {Fore.GREEN}Criar Tabelas {Fore.MAGENTA}(loja)")
    print(f"{Fore.MAGENTA}[ 0 ] {Fore.RED}Sair")
    linhaSeparadora()

def main():
    while True:
        exibirMenu()
        opcao = input(f"{Fore.GREEN}Digite a opção desejada: {Fore.RESET}")

        if opcao == '1':
            conexao = conectarBanco(1)
            if conexao:
                criarDataBase(conexao)
                conexao.close()
            input(f"\n{Fore.YELLOW}Pressione Enter para continuar...{Fore.RESET}")

        elif opcao == '2':
            conexao = conectarBanco(2)
            if conexao:
                criarTabelas(conexao)
                conexao.close()
            input(f"\n{Fore.YELLOW}Pressione Enter para continuar...{Fore.RESET}")

        elif opcao == '0':
            print(f"{Fore.LIGHTCYAN_EX}Saindo do programa...{Fore.RESET}")
            break

        else:
            print(f"{Fore.RED}Opção inválida!{Fore.RESET}")
            input(f"\n{Fore.YELLOW}Pressione Enter para continuar...{Fore.RESET}")

if __name__ == "__main__":
    main()
