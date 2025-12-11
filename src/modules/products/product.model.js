
import pool from '../../config/db.js'

export const getProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM products WHERE deleted_at IS NULL')
  return rows
}

export const getProduct = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id_product = ? AND deleted_at IS NULL', [id])
  return rows[0]
}

export const createProduct = async (product) => {
  const { nombre, descripcion, precio, stock } = product
  const [rows] = await pool.query('INSERT INTO products (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, stock])
  return {
    id: rows.insertId,
    nombre,
    descripcion,
    precio,
    stock
  }
}

export const updateProduct = async (id, product) => {
  const { nombre, descripcion, precio, stock } = product
  const [rows] = await pool.query('UPDATE products SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id_product = ?', [nombre, descripcion, precio, stock, id])
  return rows
}

export const deleteProduct = async (id) => {
  const [rows] = await pool.query('UPDATE products SET deleted_at = CURRENT_TIMESTAMP WHERE id_product = ?', [id])
  return rows
}
