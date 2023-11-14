import { Request, Response } from "express";
import Comprador from "../models/comprador";
import compradorRepository from "../repositories/comprador.repository";

export default class CompradorController {
  async save(req: Request, res: Response) {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const comprador: Comprador = req.body;
      const savedComprador = await compradorRepository.save(comprador);

      res.status(200).send(savedComprador);
    } catch (err) {
      res.status(500).send({
        message: "No es posible realizar la operación solicitada."
      });
    }
  }
}
