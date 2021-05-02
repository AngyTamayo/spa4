const express = require('express');
const router = express.Router();
const pool = require('../database');
exports.ListarInventarios = async (req,res) => {
        const pqr = await pool.query("SELECT * FROM inventario", (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
}

exports.AgregarInventario = async (req,res) => {
        const {producto, marca, cantidad, codigo} = req.body;
        const Aginven = {producto, marca, cantidad, codigo};
        await pool.query("INSERT INTO inventario set ?", [Aginven], (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send("datos exitosos")
            }
        });
    }

exports.ModificarInventario = async (req,res) => {
    try {
        const { id } = req.params;
        const {producto, marca, cantidad, codigo} = req.body;
        const editar = {producto, marca, cantidad, codigo};
        const editarInven= await pool.query("UPDATE inventario SET ? WHERE idInventario = ?", [editar, id]);

        res.status(200).json({editarInven, msg: "Inventario modificado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}

exports.EliminarInventario = async (req,res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM inventario WHERE idInventario = ?", [id]);
        res.status(200).json({ msg: "inventario eliminado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
} 