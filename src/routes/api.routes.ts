import { Router } from "express";
import CompradorController from "../controllers/comprador.controller";
import CategoriaController from "../controllers/categoria.controller";
import ProductoController from "../controllers/producto.controller";
import FacturaController from "../controllers/comprador.controller";
import CarritoComprasController from "../controllers/carrito.compras.controller";

class ApiRoutes {
  router = Router();
  compradorController = new CompradorController();
  categoriaController = new CategoriaController();
  productoController = new ProductoController();
  facturaController = new FacturaController();
  carritoComprasController = new CarritoComprasController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/comprador", this.compradorController.save);
    this.router.post("/categoria", this.categoriaController.save);
    this.router.post("/producto", this.productoController.save);
    this.router.post("/factura", this.facturaController.save);
    this.router.post("/carrito", this.carritoComprasController.addProduct);
  }
}

export default new ApiRoutes().router;
