// Primeiramente crie o app usando express
const express = require("express")
const app = express()

let idFilmes = 1 // Variável para gerar o id dos filmes no endpoint POST /filmes
let idSeries = 1 // Variável para gerar o id das séries no endpoint POST /series

// Permitir aceitar JSON na requisição
app.use(express.json())


// Criar o array com objetos dos filmes e séries
const filmes = [
    {
        id: 1,
        description: "Apesar da proibição da música por gerações de sua família, o jovem Miguel sonha em se tornar um músico talentoso como seu ídolo Ernesto de la Cruz. Desesperado para provar seu talento, Miguel se encontra na deslumbrante e colorida Terra dos Mortos. Depois de conhecer um charmoso malandro chamado Héctor, os dois novos amigos embarcam em uma jornada extraordinária para desvendar a verdadeira história por trás da história da família de Miguel.",
        title: "Viva: a vida é uma festa",
        genre: "Infantil/Fantasia",
        image: "https://m.media-amazon.com/images/M/MV5BMjkyZDZjNzMtMmY0NS00NWMxLThjNWQtNjBlMjI2N2UwZGFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        releaseYear: 2017,
    },
]

const series = [
    {
        id: 1,
        description: "Jake Peralta é um detetive brilhante e, ao mesmo tempo, imaturo, que nunca precisou se preocupar em respeitar as regras. Tudo muda quando um capitão exigente assume o comando de seu esquadrão e Jake deve aprender a trabalhar em equipe.",
        title: "Brooklyn 99",
        genre: "Comédia Policial",
        image: "https://m.media-amazon.com/images/M/MV5BNzBiODQxZTUtNjc0MC00Yzc1LThmYTMtN2YwYTU3NjgxMmI4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        releaseYear: 2013
    },
]

/////////////////////////////////////////////////////////////////////////  Filmes  /////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint GET /filmes - Lista todos os filmes ou filtra por nome
app.get("/filmes", function(req, res){
    const genre = req.query.genre 

    //Se não passar query param, retorna todos
    //O ponto de exclamação inverte o valor
    //Se o nome não tiver valor ele é falso, mas por conta
    //do sinal de exclamação ele vira verdadeiro e execulta 
    //o que está no if
    if(!genre){
        return res.json(filmes)
    }

    const filmesFiltrados = filmes.filter(f => 
        f.genre.toLowerCase().includes(genre.toLowerCase())
    )

    res.json(filmesFiltrados)
 
})

// Endpoint POST /filmes - Cria um novo filme
app.post("/filmes", function (req, res) {
    const description = req.body.description
    const title = req.body.title
    const genre = req.body.genre
    const image = req.body.image
    const releaseYear = req.body.releaseYear

    // Validação
    if (!title || !description || !genre || !image || !releaseYear) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios!" })
    }

    if (title.length < 2) {
        return res.status(400).json({ erro: "O título deve conter pelo menos 2 caracteres!" })
    }

    // criando um objeto novo, com as informações que veio do cliente
    const novoFilme = {
        id: idFilmes + 1, // id é o próximo número da sequência
        description: description,
        title: title,
        genre: genre,
        image: image,
        releaseYear: releaseYear
    }

    idFilmes++
    
    // Add o novo filme no final da lista
    filmes.push(novoFilme)
    res.status(201).json(novoFilme)
})


// Buscar um filme pelo seu id
app.get("/filmes/:id", function(req, res){
    const id = parseInt(req.params.id) // O query parameter volta como um texto
 
    const filme = filmes.find(f => f.id == id)
 
    // Se a variavel for nula é igual a falso, se tiver alguma coisa é verdade
    if(filme){
        return res.json(filme)
    } else {
        res.status(404).json("Filme não encontrado")
    }
})

/////////////////////////////////////////////////////////////////////////  Séries /////////////////////////////////////////////////////////////////////////////////////////////////


// Endpoint GET /series - Lista todas as séries ou filtra por nome
app.get("/series", function(req, res){
    const genre = req.query.genre 

    //Se não passar query param, retorna todos
    //O ponto de exclamação inverte o valor
    //Se o nome não tiver valor ele é falso, mas por conta
    //do sinal de exclamação ele vira verdadeiro e execulta 
    //o que está no if
    if(!genre){
        return res.json(series)
    }

    const seriesFiltradas = series.filter(s => 
        s.genre.toLowerCase().includes(genre.toLowerCase())
    )

    res.json(seriesFiltradas)
 
})

// Buscar uma série pelo seu id
app.get("/series/:id", function(req, res){
    const id = parseInt(req.params.id) // O query parameter volta como um texto
 
    const serie = series.find(s => s.id == id)
 
    // Se a variavel for nula é igual a falso, se tiver alguma coisa é verdade
    if(serie){
        return res.json(serie)
    } else {
        res.status(404).json("Serie não encontrada")
    }
})


// Endpoint POST /series - Cria uma nova série
app.post("/series", function (req, res) {
    const description = req.body.description
    const title = req.body.title
    const genre = req.body.genre
    const image = req.body.image
    const releaseYear = req.body.releaseYear

    // validação
    if (!title || !description || !genre || !image || !releaseYear) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios!" })
    }

    // criando um objeto novo, com as informações que veio do cliente
    const novaSerie = {
        id: idSeries + 1, // id é o próximo número da sequência
        description: description,
        title: title,
        genre: genre,
        image: image,
        releaseYear: releaseYear
    }

    idSeries++
    
    // Add a nova série no final da lista
    series.push(novaSerie)
    res.status(201).json(novaSerie)
})

// Segundo passo colocar o servidor para rodar
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})
