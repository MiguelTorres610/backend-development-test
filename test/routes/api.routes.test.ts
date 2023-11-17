import {
  addProduct,
  deleteProduct,
  clearShoppingCart,
  showProducts,
} from "../../src/controllers/carrito.compras.controller";

describe("Carrito Compras Controller", () => {
  describe("addProduct", () => {
    it("should add a product to the shopping cart", () => {
      // Arrange
      // Mock request and response objects
      const req = { body: { product: "Test Product" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Act
      addProduct(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Product added to shopping cart",
      });
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product from the shopping cart", () => {
      // Arrange
      // Mock request and response objects
      const req = { body: { product: "Test Product" } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Act
      deleteProduct(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Product deleted from shopping cart",
      });
    });
  });

  describe("clearShoppingCart", () => {
    it("should clear the shopping cart", () => {
      // Arrange
      // Mock request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Act
      clearShoppingCart(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Shopping cart cleared",
      });
    });
  });

  describe("showProducts", () => {
    it("should return the products in the shopping cart", () => {
      // Arrange
      // Mock request and response objects
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      // Act
      showProducts(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ products: [] });
    });
  });
});
