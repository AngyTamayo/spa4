const express = require('express');
const router = express.Router();
const pool = require('../database');

exports.ListarInicios = async (req,res) => {
        const inicio = await pool.query("SELECT * FROM inicio", (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
}

exports.AgregarInicio = async (req,res) => {
        const {usuario,contra} = req.body;
        const Aginicio = {usuario,contra};
        await pool.query("INSERT INTO inicio set ?", [Aginicio], (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send("datos exitosos")
            }
        });
}

exports.ModificarInicio = async (req,res) => {
    try {
        const { id } = req.params;
        const {usuario,contra} = req.body;
        const editar = {usuario,contra};
        const editarInicio= await pool.query("UPDATE inicio SET ? WHERE id = ?", [editar, id]);

        res.status(200).json({editarInicio, msg: "Inicio modificado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}

exports.EliminarInicio = async (req,res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM inicio WHERE id= ?", [id]);
        res.status(200).json({ msg: "inicio eliminado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
} 