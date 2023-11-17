import { Request, Response } from "express";
import Producto from "../models/producto";

export let listaProductos: Array<Producto> = [];

export const addProduct = async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const producto: Producto = req.body;

  if (producto) {
    const item = listaProductos.find(obj => obj.id == producto.id);
    if (item) {
      listaProductos.map(function (item) {
        if (item.id == producto.id) {
          item.cantidad = item.cantidad + 1;
        }
      });
    } else {
      producto.cantidad = 1;
      listaProductos.push(producto);
    }
    res.status(200).send({ message: "Producto agregado" });
  } else {
    res.status(400).send({ message: "No es posible agregar el producto" });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const producto: Producto = req.body;

  if (producto.id) {
    if (listaProductos.length != 0) {
      if (listaProductos.find(obj => obj.id == producto.id)) {
        const nuevaLista: Array<Producto> = listaProductos.filter((obj => obj.id != producto.id));
        listaProductos = nuevaLista;
        res.status(200).send({ message: "Producto eliminado" });
      } else {
        res.status(400).send({ message: "No es posible eliminar el producto" });
      }
    } else {
      res.status(400).send({ message: "No hay productos en el carrito" });
    }
  } else {
    res.status(400).send({ message: "El id del producto no es valido" });
  }
}

export const clearShoppingCart = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');

  if (listaProductos.length != 0) {
    listaProductos = [];
    res.status(200).send({ message: "Carrito de compras desocupado" });
  } else {
    res.status(400).send({ message: "No hay productos en el carrito" });
  }
}

export const showProducts = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');

  if (listaProductos.length != 0) {
    res.status(200).send({ message: listaProductos });
  } else {
    res.status(400).send({ message: "No hay productos en el carrito" });
  }
}

export const removeProductsCart = (list: Array<Producto>) => {
  if (listaProductos.length != 0) {
    listaProductos = list;
    console.log("Carrito de compras desocupado");
  } else {
    console.log("No hay productos en el carrito");
  }
}