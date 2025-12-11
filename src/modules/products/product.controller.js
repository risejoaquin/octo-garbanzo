import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from './product.model.js'

export const getProductsController = async (req, res) => {
  const products = await getProducts()
  res.json(products)
}

export const getProductController = async (req, res) => {
  const { id } = req.params
  const product = await getProduct(id)
  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }
  res.json(product)
}

export const createProductController = async (req, res) => {
  const newProduct = await createProduct(req.body)
  res.status(201).json(newProduct)
}

export const updateProductController = async (req, res) => {
  const { id } = req.params
  const updatedProduct = await updateProduct(id, req.body)
  if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found' })
  }
  res.json(updatedProduct)
}

export const deleteProductController = async (req, res) => {
  const { id } = req.params
  const deletedProduct = await deleteProduct(id)
  if (!deletedProduct) {
    return res.status(404).json({ message: 'Product not found' })
  }
  res.sendStatus(204)
}
