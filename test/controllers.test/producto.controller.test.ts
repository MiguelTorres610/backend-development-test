import { Request, Response } from "express";
import ProductoController from "../../src/controllers/producto.controller";
import productoRepository from "../../src/repositories/producto.repository";

// Mockear la función save del repository para que retorne un objeto de prueba
jest.mock("../repositories/producto.repository", () => ({
  save: jest.fn().mockResolvedValue({ id: 1, nombre: "Producto de prueba" }),
}));

describe("ProductoController", () => {
  let req: Request;
  let res: Response;
  let productoController: ProductoController;

  beforeEach(() => {
    req = {} as Request;
    res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;
    productoController = new ProductoController();
  });

  describe("save", () => {
    it("should save a valid producto and return a success message", async () => {
      req.body = { id: 1, nombre: "Producto de prueba" };

      await productoController.save(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: { id: 1, nombre: "Producto de prueba" },
      });
      expect(productoRepository.save).toHaveBeenCalledWith({
        id: 1,
        nombre: "Producto de prueba",
      });
    });

    it("should return a 400 status and error message if req.body is empty", async () => {
      await productoController.save(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Content can not be empty!",
      });
      expect(productoRepository.save).not.toHaveBeenCalled();
    });

    it("should return a 500 status and error message if an error occurs", async () => {
      req.body = { id: 1, nombre: "Producto de prueba" };

      // Mockear el repositorio para que retorne un error
      //productoRepository.save.mockRejectedValueOnce(new Error("Fake error"));

      await productoController.save(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: "No es posible realizar la operación solicitada.",
      });
      expect(productoRepository.save).toHaveBeenCalledWith({
        id: 1,
        nombre: "Producto de prueba",
      });
    });
  });
});