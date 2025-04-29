import psycopg2
import os
import json 
from colorama import Fore 

def carregarCredencial():
    caminho_base = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) 
    caminho_arquivo = os.path.join(caminho_base, 'data', 'credenciais.json')   
    with open(caminho_arquivo, 'r') as arquivo:
        return json.load(arquivo)
    
def conectarBanco(banco):
    credenciais = carregarCredencial()
    try:
        if banco == 1:
            nome_db = credenciais['db']
        elif banco == 2:
            nome_db = credenciais['db_loja']
        else:
            print(f"{Fore.RED} Valor inválido para banco: {banco}")
            return None

        conexao = psycopg2.connect(
            host=credenciais['host'],
            dbname=nome_db,
            user=credenciais['usuario'],
            password=credenciais['senha']
        )
        conexao.autocommit = True
        return conexao

    except Exception as e:
        print(f"{Fore.RED} Erro ao conectar no banco de dados | {e}")
        return None
