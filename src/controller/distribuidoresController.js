const express = require('express');
const router = express.Router();
const pool = require('../database');

exports.ListarDistribuidores = async (req,res) => {
        const distribuidores = await pool.query("SELECT * FROM distribuidores", (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
}



exports.AgregarDistribuidor = async (req,res) => {
        const {nombre,empresa} = req.body;
        const AgDistri = {nombre,empresa};
        await pool.query("INSERT INTO distribuidores set ?", [AgDistri], (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send("datos exitosos")
            }
        });
}

exports.ModificarDistribuidor = async (req,res) => {
    try {
        const { id } = req.params;
        const {nombre,empresa} = req.body;
        const editar = {nombre,empresa};
        const editarDistri= await pool.query("UPDATE distribuidores SET ? WHERE idDistribuidores = ?", [editar, id]);

        res.status(200).json({editarDistri, msg: "distribuidores modificado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}

exports.EliminarDistribuidor = async (req,res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM distribuidores WHERE idDistribuidores = ?", [id]);
        res.status(200).json({ msg: "distribuidores eliminado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}