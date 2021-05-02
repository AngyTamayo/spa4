const express = require('express');
const router = express.Router();
const pool = require('../database');

exports.ListarEmpleados = async (req,res) => {
        const empleado = await pool.query("SELECT * FROM empleado", (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        })
}

exports.AgregarEmpleado = async (req,res) => {
        const {nombre,edad,cedula,cargo} = req.body;
        const AgEmple = {nombre,edad,cedula,cargo};
        await pool.query("INSERT INTO empleado set ?", [AgEmple], (err, result) =>{
            if (err) {
                console.log(err)
            } else {
                res.send("datos exitosos")
            }
        });
}

exports.ModificarEmpleado = async (req,res) => {
    try {
        const { id } = req.params;
        const {nombre,edad,cedula,cargo} = req.body;
        const editar = {nombre,edad,cedula,cargo};
        const editarEmple= await pool.query("UPDATE empleado SET ? WHERE idEmpleado = ?", [editar, id]);

        res.status(200).json({editarEmple, msg: "Empleado modificado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}

exports.EliminarEmpleado = async (req,res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM empleado WHERE idEmpleado = ?", [id]);
        res.status(200).json({ msg: "Empleado eliminado" });
    } catch (err) {
        res.status(401).json({ err: err });
    }
}