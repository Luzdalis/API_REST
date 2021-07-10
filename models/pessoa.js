const mongoose = require('mongoose')

const userSchema = mongoose.Schema

const PessoaSchema = new userSchema({
    name: { 
        type: String, 
        required: true
    },
    data_nac: { 
        type: Date, 
        required: true
    },
    ativo: { 
        type: Boolean, 
        default: true 
    }
})

module.exports = mongoose.model('Pessoa', PessoaSchema)