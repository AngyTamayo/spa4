const express = require('express');
const router = express.Router();
const pool = require('../database');

exports.ListarComidas = async (req,res) => {
        const comidas = await pool.query("SELECT * FROM comidas", (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
}


exports.AgregarComida = async (req,res) => {
        const {idComidas,comida,bebida} = req.body;
        const AgComida = {idComidas,comida,bebida};
        await pool.query("INSERT INTO comidas set ?", [AgComida], (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send("datos exitosos")
            }
        });
}

exports.ModificarComida = async (req,res) => {
    try {
        const { id } = req.params;
        const {idComidas,comida,bebida} = req.body;
        const editar = {idComidas,comida,bebida};
        const editarComida= await pool.query("UPDATE comidas SET ? WHERE idComidas = ?", [editar, id]);

        res.status(200).json({editarComida, msg: "comida modificado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}

exports.EliminarComida = async (req,res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM comidas WHERE idComidas = ?", [id]);
        res.status(200).json({ msg: "comidas eliminado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}