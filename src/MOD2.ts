import promptSync from "prompt-sync"
const prompt = promptSync();

    abstract class Movimentacao{
    abstract registrarAlteracao(produto: Produto, quantidade: number): void;
    }

class Produto{
    constructor(public nome: string, public codigo:string, public preco: number, private quantidade: number){}

    public getqtd(): number{
     return this.quantidade
    }

    getnome(){
        return this.nome;
    }
    adicionarQuantidade(valor: number): void{
        if(valor > 0){
            this.quantidade += valor
        }else{
            throw new Error(`Não se pode adicionar 0 ou menos`)
        }
    }
    removerQuantidade(valor: number): void{
        if(valor > 0){
            this.quantidade -= valor;
        }else{
            throw new Error(`Não pode diminuir 0 ou menos`)
    }
}
}


class Estoque{
    private produto: Produto[] = [];
    constructor(){
    this.produto = [];
    }

    gerenciarProduto(produto: Produto): void{
        this.produto.push(produto)
        console.log(`Produtos Cadastrados: `)
        this.produto.forEach((produto, index)=> {
            console.log(`Produto: ${index + 1}: ${produto.nome}|ID:  ${produto.codigo}| Preço: ${produto.preco}`)
        });
    }
    buscarProduto(nome: string): Produto | undefined{
        return this.produto.find(p => p.getnome() === nome)
    }
relatorio():void{
 this.produto.forEach(produto => {
    console.log(`Produto: ${produto.nome} | Qtds: ${produto.getqtd()} | Preço: ${produto.preco}`); 
 })
}
}

class Entrada extends Movimentacao{
registrarAlteracao(produto: Produto, quantidade: number): void {
   produto.adicionarQuantidade(quantidade);
    console.log(`Entrada: ${produto.nome} -> Adicionado ${quantidade}`)

}
}

class Saida extends Movimentacao{
    registrarAlteracao(produto: Produto, quantidade: number): void {
        produto.removerQuantidade(quantidade);
        console.log(`Saida: ${produto.nome} -> Removidas ${quantidade}`);
    }
}

const estoque = new Estoque();

console.log("===Menu de Opções===");
console.log("1 - Cadastrar Produto");
console.log("2 - Registrar Entrada");
console.log("3 - Registrar Saida");
console.log("4 - Gerar relatorio de estoque");
console.log("5 - Fechar Programa");

do{

const opcao = Number(prompt("Qual operação deseja realizar: "));
if(opcao < 1 || opcao > 5){
    throw new Error("Valido apenas valores de 1 a 5");
}


if(opcao == 1){
const nome = prompt("Nome do Produto: ");
const codigo = prompt("Codigo do produto: ");
const preco = Number(prompt("Preço do produto: "));
const quantidade = Number(prompt("quantidade adicionada: "));
const produto = new Produto(nome,codigo,preco,quantidade);
estoque.gerenciarProduto(produto);
}
if(opcao == 2){
const nome  =prompt("Nome do produto para registro: ");
const produto = estoque.buscarProduto(nome);
if(produto){
    const entrada = Number(prompt("Quantidade de entrada: "));
    new Entrada().registrarAlteracao(produto,entrada);
}
}
if(opcao == 3){
const nome = prompt("Nome do produto para saida: ");
const produto = estoque.buscarProduto(nome);
if(produto){
    const saida = Number(prompt("Quantidade da saida: "));
    new Saida().registrarAlteracao(produto,saida)
}
}
if(opcao == 4){
    estoque.relatorio();
}
} while(true);

/* const p1 = new Produto("Sabonete liquido", "3", 10, 10)
const E = new Entrada();
E.registrarAlteracao(p1,10);
const e1 = new Estoque
e1.relatorio(p1); */
