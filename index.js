const express = require('express')
const mongoose = require('mongoose')
const Pessoa = require('./models/pessoa')

const app = express()
app.use(express.json());

const port = 4000

const mongoUrl = 'mongodb://localhost:27017/pessoas'
mongoose.connect(mongoUrl, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB deu erro'))



//Le todos os documentos
app.get('/pessoas', async (req, res) => {
    try{
        const pessoa = await Pessoa.find({})
        res.status(200).json({ pessoa })
        console.log('Retornada a Base de dados com sucesso')        
    }
    catch (error) {
        res.status(404).json({ message: 'A Base de dados esta vazia'})
        console.log('Não se encontraram dados na Base de dados')
    }
})

//Busca um documento pelo Id
app.get('/search/:id', async (req, res) =>{
    try{
        const pessoa = await Pessoa.findById(req.params.id)
        res.status(200).json({ pessoa })
        console.log('Pessoa encontrada com sucesso')
    }
    catch (err) {
        res.status(404).json({ message: 'A pessoa não esta cadastrada'})
        console.log('A pessoa não foi encontrada')
    }
})

//Cria um documento
app.post('/create', async (req, res) => { 
try{
    const pessoa = await Pessoa.create(req.body)

    res.status(200).json( { pessoa })
    console.log('Pessoa cadastrada com sucesso')
}
catch (error){
    res.status(404).json({ message: "Ocurreu um erro no cadastro" })
    console.log('Não foi possivel fazer o cadastro')
}
}) 

//Atualiza um documento
app.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body;
        const pessoa_existe = await Pessoa.findById(req.params.id)
        console.log(data)
        console.log(id)
        console.log(pessoa_existe)
        if ((Object.keys(data).length === 0) && (id !== pessoa_existe)){
            return res.send('Erro na requisição, esta vazia')
        }
        else{
        const pessoa = await Pessoa.findByIdAndUpdate(req.params.id, req.body, { new: true})
        res.status(200).json( { pessoa })
        console.log('Pessoa atualizada com sucesso')
        }
    } 
    catch (error) {
        res.status(404).json({ message: "O cadastro não existe" })
        console.log('Não foi possivel atualizar')
    }
})

//Apaga um documento
app.delete('/deletar/:id', async (req, res) => {
    try{
        await Pessoa.findByIdAndRemove(req.params.id)
        res.status(200).json({ message: 'A pessoa foi deletada com sucesso' })
        console.log('Pessoa deleitada da Base de dados')
    }
    catch (error) {   
        res.status(404).json({ message: "A pessoa não exite" });
        console.log('A pessoa não foi encontrada')
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})