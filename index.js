const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const PORT = 3000

// 1. Configuração do Handlebars com suporte a Partials
const hbs = exphbs.create({
    partialsDir: ['views/partials'],
})

// define a configuração em partials
app.engine('handlebars', hbs.engine)
// Usa a string 'handlebars' como engine padrão
app.set('view engine', 'handlebars')

// 2. Servir arquivos estáticos (CSS, imagens locais, JS)
app.use(express.static('public'))

// 3. Array base de produtos (com ID para rotas dinâmicas) BANCO DE DADOS FALSO
const produtos = [
    {
        id: '1',
        image: 'https://http2.mlstatic.com/D_NQ_NP_2X_983067-MLA106542233674_022026-F.webp',
        nome: 'Notebook Acer',
        categoria: 'Eletrônicos',
        descricao: 'Notebook de alta qualidade e alta performance.',
        valor: '5.000,00'
    },
    {
        id: '2',
        image: 'https://http2.mlstatic.com/D_NQ_NP_2X_994043-MLA111969842152_062026-F.webp',
        nome: 'Smartphone Samsung',
        categoria: 'Eletrônicos',
        descricao: 'Smartphone de última geração com tela AMOLED.',
        valor: '3.200,00'
    },
    {
        id: '3',
        image: 'https://images.kabum.com.br/produtos/fotos/134176/cadeira-gamer-husky-tempest-700-ate-145kg-almofadas-reclinavel-150-pu-descanso-para-pes-preta-hcg700pt_1760035650_gg.jpg',
        nome: 'Cadeira Gamer',
        categoria: 'Móveis',
        descricao: 'Cadeira ergonômica ideal para longas sessões de trabalho e jogos.',
        valor: '1.100,00'
    }
]

// 4. Rota principal (Home)
app.get('/', (req, res) => {
    res.render('home', { produtos })
})

// 5. Rota dinâmica para a página individual do produto (Requisito 5)
app.get('/product/:id', (req, res) => {
    const id = req.params.id
    const product = produtos.find((p) => p.id === id)

    if (!product) {
        return res.status(404).render('home', { produtos, erro: 'Produto não encontrado!' })
    }

    res.render('product', { product })
})

// 6. Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
})