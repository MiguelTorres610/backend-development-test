import { Request, Response } from "express";
import CarritoCompras from "../models/carrito.compras";
import Producto from "../models/producto";

let carritoCompras: CarritoCompras = new CarritoCompras();

export default class CarritoComprasController {
  async addProduct(req: Request, res: Response) {
    const producto: Producto = req.body;

    if (producto) {
      let size = carritoCompras.lista_productos?.push(producto);
      console.log(size);
      res.status(200).send("Producto agregado");
    } else {
      res.status(200).send("No es posible agregar el producto");
    }
  }
}
