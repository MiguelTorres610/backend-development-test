import { Router } from "express";
import CompradorController from "../controllers/comprador.controller";
import CategoriaController from "../controllers/categoria.controller";
import ProductoController from "../controllers/producto.controller";
import FacturaController from "../controllers/factura.controller";
import {
  addProduct,
  deleteProduct,
  clearShoppingCart,
  showProducts
} from "../controllers/carrito.compras.controller";

class ApiRoutes {
  router = Router();
  compradorController = new CompradorController();
  categoriaController = new CategoriaController();
  productoController = new ProductoController();
  facturaController = new FacturaController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/carrito/add", addProduct);
    this.router.post("/carrito/del", deleteProduct);
    this.router.delete("/carrito/clear", clearShoppingCart);
    this.router.get("/carrito/show", showProducts);
    this.router.post("/comprador", this.compradorController.save);
    this.router.get("/pago/:id", this.compradorController.payPurchase);
    this.router.post("/categoria", this.categoriaController.save);
    this.router.post("/producto", this.productoController.save);
    this.router.post("/factura", this.facturaController.save);
    this.router.get("/factura/:idFactura", this.facturaController.getItemByid);
    this.router.get("/factura/comprador/:idComprador", this.facturaController.getItemByid);
  }
}

export default new ApiRoutes().router;
