//Função prompt sync para interagir com usuario
import { get } from "http";
import promptSync from "prompt-sync"
const prompt = promptSync();
    //Classe Abstrata Movimentação
    abstract class Movimentacao{
    abstract registrarAlteracao(produto: Produto, quantidade: number): void;
    }
//Classe Produto
class Produto{
    constructor(public nome: string, public codigo:string, public preco: number, private quantidade: number){}

    public getqtd(): number{
     return this.quantidade
    }

    getnome(){
        return this.nome;
    }
    //Metodo de adição ao Atributo quantidade
    adicionarQuantidade(valor: number): void{
        if(valor > 0){
            this.quantidade += valor
        }else{
            throw new Error(`Não se pode adicionar 0 ou menos`)//Exibir erro não se pode adicionar valor menor que 0
        }if(this.quantidade <= 5){
        console.log("ALERTA!! Estoque baixo(Menor/igual a 5)")//Exibir Alerta de baixo estoque
    }
    }
    //Metodo de remoção ao Atributo quantidade
    removerQuantidade(valor: number): void{
        if(valor > 0){
            this.quantidade -= valor;
        }else{
            throw new Error(`Não pode diminuir 0 ou menos`)//Exibe erro de Não pode diminuir - 0
    }if(this.quantidade <= 5){
        console.log("ALERTA!! Estoque baixo(Menor/Igual a 5)") //Exibe Alerta de baixo estoque
    }
}
}
//Classe Estoque
class Estoque{
    private produto: Produto[] = [];
    constructor(){
    this.produto = [];
    }
    //Metodo para adicioanar Produtos ao estoque
    gerenciarProduto(produto: Produto): void{
        const duplicado = this.produto.find(p =>
            p.nome === produto.nome || p.codigo === produto.codigo
        );
        if(duplicado){
            throw new Error("Nome ou codigo ja usado em outro produto")//Exibe Erro caso nome ou id ja foi cadastrado
        }
        this.produto.push(produto)
        console.log(`Produtos Cadastrado: ${produto.nome}`)//Exibe confirmação que o produto foi cadastrado
    }
    //Metodo para identifcar nomes do produto
    buscarProduto(nome: string): Produto | undefined{
        return this.produto.find(p => p.getnome() === nome)
    }
    //Relatorio onde fica a lista de Produtos
    relatorio():void{
    if(this.produto.length === 0){
        throw new Error("Nenhum produto encontrado no relatorio!");//Exobe erro caso não tenha nenhum produto cadastrado
    }
    this.produto.forEach(produto => {
    console.log(`Produto: ${produto.nome} | Qtds: ${produto.getqtd()} | Preço: ${produto.preco}`); //Exibe os produtos + quantidades + preço
 })
}
}
//Classe Entrada que herda de Movimentação
class Entrada extends Movimentacao{
//Metodo herdado que faz a Entrada de um produto
registrarAlteracao(produto: Produto, quantidade: number): void {
   produto.adicionarQuantidade(quantidade);
    console.log(`Entrada: ${produto.nome} -> Adicionado ${quantidade}`);//Exibe nome do produto + quantidade adicionada

}
}
//Classe Saida que herda de Movimentação
class Saida extends Movimentacao{
//Metodo herdado que faz a Saida de um Produto
 registrarAlteracao(produto: Produto, quantidade: number): void {
        produto.removerQuantidade(quantidade);
        console.log(`Saida: ${produto.nome} -> Removidas ${quantidade}`);//Exibe nome do produto + quantidade removida
    }
}

const estoque = new Estoque();
//Menu de interação
console.log("===Menu de Opções===");
console.log("1 - Cadastrar Produto");
console.log("2 - Registrar Entrada");
console.log("3 - Registrar Saida");
console.log("4 - Gerar relatorio de estoque");
console.log("5 - Fechar Programa");

do{
try{
//Interação do usuario para escolha da operação
const opcao = Number(prompt("Qual operação deseja realizar: "));
if(opcao < 1 || opcao > 5 || isNaN(opcao)){
    throw new Error("Valido apenas valores de 1 a 5");//Exibe erro, so pode valores de 1 a 5
}

//Estrutura Opção 1 Cadastro de Produtos
if(opcao == 1){
const nome = prompt("Nome do Produto: ");
const codigo = prompt("Codigo do produto: ");
const preco = Number(prompt("Preço do produto: "));
const quantidade = Number(prompt("quantidade adicionada: "));
if(isNaN(preco) || isNaN(quantidade)){
    throw new Error("Preço e quantidade apenas aceita numeros");//Exibe erro Quantidade ou Preoço não são numeros
}
const produto = new Produto(nome,codigo,preco,quantidade);
estoque.gerenciarProduto(produto);
}
//Estrutura Opção 2 Registrar Entrada
if(opcao == 2){
const nome = prompt("Nome do produto para registro: ");
const produto = estoque.buscarProduto(nome);
if(produto){
    const entrada = Number(prompt("Quantidade de entrada: "));
    new Entrada().registrarAlteracao(produto,entrada);
} else{
    throw new Error("Nenhum produto cadastrado!!");//Identifica o cadastro de nenhum produto
}
}
//Estrutura Opção 3 Registrar Saida
if(opcao == 3){
const nome = prompt("Nome do produto para saida: ");
const produto = estoque.buscarProduto(nome);
if(produto){
    const saida = Number(prompt("Quantidade da saida: "));
    if(saida > produto.getqtd() || isNaN(saida)){
        throw new Error("Quantidade insuficiente no armazenamento OU saida não é um numero")//Exibe erro de armazenamento/Saida não é um numero
    }
    new Saida().registrarAlteracao(produto,saida)
}else{
 throw new Error(`Nenhum produto cadastrado!`)
}
}
//Estrutura Opção 4 Gerar Relatorio de estoque
if(opcao == 4){
    estoque.relatorio();
}
//Estrutura Opção 5 Fechar Programa
if(opcao == 5){
    console.log("Encerrando programa"); break;
}
}catch(erro){
    console.log("Erro:", (erro as Error).message);
}
}while(true);
