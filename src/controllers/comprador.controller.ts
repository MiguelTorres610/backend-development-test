import { Request, Response } from "express";
import Comprador from "../models/comprador";
import Factura from "../models/factura";
import FacturaDetalle from "../models/factura.detalle";
import compradorRepository from "../repositories/comprador.repository";
import facturaRepository from "../repositories/factura.repository";
import facturaDetalleRepository from "../repositories/factura.detalle.repository";
import {
  listaProductos,
  removeProductsCart
} from "../controllers/carrito.compras.controller"

export default class CompradorController {
  async save(req: Request, res: Response) {
    res.setHeader('Content-Type', 'application/json');

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const comprador: Comprador = req.body;
      const savedComprador = await compradorRepository.save(comprador);
      res.status(200).send({ message: savedComprador });
    } catch (err) {
      res.status(500).send({
        message: "No es posible realizar la operación solicitada."
      });
    }
  }

  async payPurchase(req: Request, res: Response) {
    res.setHeader('Content-Type', 'application/json');

    try {
      const idComprador: number = parseInt(req.params.id);
      let costoTotal: number = 0;
      const factura: Factura = {};
      const facturaDetalle: FacturaDetalle = {};

      if (listaProductos.length != 0) {
        listaProductos.forEach(item => {
          costoTotal += item.precio! * item.cantidad;
        });
        factura.id_comprador = idComprador;
        factura.costo_total = costoTotal;
        const savedFactura = await facturaRepository.save(factura);
        facturaDetalle.id_factura = savedFactura.id;
        listaProductos.forEach(async item => {
          facturaDetalle.id_producto = item.id;
          facturaDetalle.cantidad = item.cantidad;
          facturaDetalle.subtotal = item.precio! * item.cantidad;
          await facturaDetalleRepository.save(facturaDetalle);
        });
        removeProductsCart([]);
        res.status(200).send({
          message: "Pago realizado exitosamente"
        });
      } else {
        res.status(400).send({
          message: "No hay productos en el carrito"
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "No es posible realizar la operación solicitada."
      });
    }
  }
}
