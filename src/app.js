import express from "express";
import pool from "./config/db.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
    
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.disable("x-powered-by")
app.use(express.json());    

app.get("/", async (req, res) => {
  const [row] = await pool.query("SELECT NOW() AS result");
  res.send(`¡Hola Mundo! La hora del servidor es: ${row[0].result}`).status(200);
});

app.get("/users", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT name, email FROM users WHERE is_visible = TRUE");
        res.json(rows).status(200);
    } catch (error) {
        console.error(error); 
        res.status(500).json({error: "Error al obtener los usuarios"});
    }
});

app.post("/users", async (req, res) => {

    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({error: "El cuerpo de la solicitud debe estar en formato JSON"});
    }

    try {
        const [emailExists] = await pool.query("SELECT id_user FROM users WHERE email = ?", [email]);
        if (emailExists.length > 0) {
            return res.status(400).json({error: "El email ya existe"});
        }   

        const password_hash = await bcrypt.hash(password, 10);  
        const [result] = await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password_hash]
        );
        res.status(201).json({message: "Usuario creado exitosamente", resultado: result.insertId});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al crear el usuario"});    
    }
});

app.delete("/users/delete/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const [result] = await pool.query("DELETE FROM users WHERE id_user = ?", [id]);
        res.status(200).json({message: "Usuario eliminado exitosamente", resultado: result});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al eliminar el usuario"});    
    }
});

app.put("/users/softdelete/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const [result] = await pool.query("UPDATE users SET is_visible = FALSE WHERE id_user = ?", [id]);
        res.status(200).json({message: "Usuario eliminado exitosamente", resultado: result});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al eliminar el usuario"});    
    }   
});

app.put("/users/active/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const [result] = await pool.query("UPDATE users SET is_visible = TRUE WHERE id_user = ?", [id]);
        res.status(200).json({message: "Usuario activado exitosamente", resultado: result});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al activar el usuario"});    
    }   
});
    

app.put("/users/:id", async (req, res) => {
    const {id} = req.params;
    const {name, email} = req.body;
    try {
     const result = await pool.query("UPDATE users SET name = ?, email = ? WHERE id_user = ?", [name, email, id]);
     res.status(200).json({message: "Usuario actualizado exitosamente", resultado: result});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al actualizar el usuario"});    
    }
});



app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto: ${PORT}`);
});

 