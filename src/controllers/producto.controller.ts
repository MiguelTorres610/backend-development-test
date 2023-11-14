import { Request, Response } from "express";
import Producto from "../models/producto";
import productoRepository from "../repositories/producto.repository";

export default class ProductoController {
  async save(req: Request, res: Response) {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const producto: Producto = req.body;
      const savedProducto = await productoRepository.save(producto);

      res.status(200).send(savedProducto);
    } catch (err) {
      res.status(500).send({
        message: "No es posible realizar la operación solicitada."
      });
    }
  }
}
