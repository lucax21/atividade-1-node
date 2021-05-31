const express = require("express");
const routes = express.Router();
const DB = require("./times");

routes.get("/times", (req, res) => {
    res.status(200).json(DB.times);
});

//http://localhost:3000/time/?nomeTime=time 2
routes.get("/time/", (req, res) => {
    //console.log(req.query.nomeTime);
    if(!(isNaN(req.query.nomeTime))){
        res.sendStatus(400);
    }else{
        const nome = req.query.nomeTime;
        const time = DB.times.find((c) => c.nome == nome);
        if(time != undefined){
            res.status(200).json(time);
        }
        else{
            res.status(404).json({msg: "Time não encontrado"});
        }
    }
});

routes.delete("/time/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }
    else{
        const id = parseInt(req.params.id);
        const index = DB.times.findIndex((c) => c.id == id);
        if(index == -1){
            res.status(404).json({msg: "Não encontrado"});
        }
        else{
            DB.times.splice(index, 1);
            res.status(200).json({msg: "Removido com sucesso"});
        }
    }
});

routes.post("/novoTime", (req, res) => {
    const {
            nome,
            cidade,
            uf,
            serie,
            titulos,
            folhaPag,
    } = req.body;

    if(nome && cidade && uf && titulos && folhaPag != undefined){
        const id = DB.times.length + 1;
        DB.times.push({
            id,
            nome,
            cidade,
            uf,
            serie,
            titulos,
            folhaPag,
        });
        res.status(200).json({msg: "Adicionado com sucesso"});
    }
    else{
        res.status(400).json({msg: "Dados obrigatórios não foram preenchidos"});
    }

});

routes.put("/time/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }
    else{
        const id = parseInt(req.params.id);
        const time = DB.times.find((c) => c.id == id);

        if(time != undefined){
            const {
                nome,
                cidade,
                uf,
                serie,
                titulos,
                folhaPag,
        } = req.body;
        if(nome != undefined) time.nome = nome;
        if(cidade != undefined) time.cidade = cidade;
        if(uf != undefined) time.uf = uf;
        if(titulos.estadual != undefined) time.titulos.estadual = titulos.estadual;
        if(titulos.nacional != undefined) time.titulos.nacional = titulos.nacional;
        if(titulos.internacional != undefined) time.titulos.internacional = titulos.internacional;
        if(folhaPag != undefined) time.folhaPag = folhaPag;
        
        res.status(200).json(time);
        }
        else {
            res.status(400).json({msg:"Time não encontrado"})
        }
    }
});


module.exports = routes;