import { Request, Response } from "express";
import facturaRepository from "../repositories/factura.repository";
import Factura from "../models/factura";

export default class FacturaController {
  async save(req: Request, res: Response) {
    res.setHeader('Content-Type', 'application/json');

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const factura: Factura = req.body;
      const savedFactura = await facturaRepository.save(factura);
      res.status(200).send({ message: savedFactura });
    } catch (err) {
      res.status(500).send({
        message: "No es posible realizar la operación solicitada."
      });
    }
  }

  async getItemByid(req: Request, res: Response) {
    res.setHeader('Content-Type', 'application/json');

    if (!req.params) {
      res.status(400).send({
        message: "Path param required!"
      });
      return;
    }

    try {
      const result = await facturaRepository.getItemByid(req.params);
      res.status(200).send({ productos: result });
    } catch (err) {
      res.status(500).send({
        message: "No es posible realizar la operación solicitada."
      });
    }
  }
}
