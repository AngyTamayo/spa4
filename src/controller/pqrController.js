const express = require('express');
const router = express.Router();
const pool = require('../database');

exports.ListarPqrs = async (req,res) => {
        const pqr = await pool.query("SELECT * FROM pqr", (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
}


exports.AgregarPqr = async (req,res) => {
        const {idPqr,sugerencia} = req.body;
        const AgPqr = {idPqr,sugerencia};
        await pool.query("INSERT INTO pqr set ?", [AgPqr], (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send("datos exitosos")
            }
        });
}

exports.ModificarPqr = async (req,res) => {
    try {
        const { id } = req.params;
        const {idPqr,sugerencia} = req.body;
        const editar = {idPqr,sugerencia};
        const editarPqr= await pool.query("UPDATE pqr SET ? WHERE idPqr = ?", [editar, id]);

        res.status(200).json({editarPqr, msg: "pqr modificado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}

exports.EliminarPqr = async (req,res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM pqr WHERE idPqr = ?", [id]);
        res.status(200).json({ msg: "pqr eliminado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}