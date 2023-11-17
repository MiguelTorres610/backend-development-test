import { Request, Response } from "express";
import Categoria from "../models/categoria";
import categoriaRepository from "../repositories/categoria.repository";

export default class CategoriaController {
  async save(req: Request, res: Response) {
    res.setHeader('Content-Type', 'application/json');

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const categoria: Categoria = req.body;
      const registro = await categoriaRepository.save(categoria);

      res.status(200).send({ message: registro });
    } catch (err) {
      res.status(500).send({
        message: "No es posible realizar la operación solicitada."
      });
    }
  }
}
