const database = require('../database');
const express = require('express');
const router = express.Router();
const pool = require('../database');
exports.ListarProductos = async (req,res) => {
        const producto = await pool.query("SELECT * FROM producto", (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
}


exports.AgregarProducto = async (req,res) => {
        const {producto, descripcion, precio} = req.body;
        const AgProducto = {producto, descripcion, precio};
        await pool.query("INSERT INTO producto set ?", [AgProducto], (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send("datos exitosos")
            }
        });
}

exports.ModificarProducto = async (req,res) => {
    try {
        const {idProducto} = req.params;
        const {producto, descripcion, precio} = req.body;
        const editar = {producto, descripcion, precio};
        const editarProdu = await pool.query("UPDATE producto SET ? WHERE idProducto = ?", [editar, idProducto]);

        res.status(200).json({editarProdu, msg: "producto modificado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}

exports.EliminarProducto = async (req,res) => {
    try {
        const {idProducto} = req.params;
        await pool.query("DELETE FROM producto WHERE idProducto = ?", [idProducto]);
        res.status(200).json({ msg: "producto eliminado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}