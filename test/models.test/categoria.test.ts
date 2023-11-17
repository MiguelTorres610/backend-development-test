import Categoria from "../../src/models/categoria";

describe("Categoria interface", () => {
  let categoria: Categoria;

  beforeEach(() => {
    categoria = {
      descripcion: "example",
    };
  });

  it("should have a descripcion property", () => {
    expect(categoria.descripcion).toBeDefined();
    expect(typeof categoria.descripcion).toBe("string");
  });

  it("should have an optional id property of type number", () => {
    categoria.id = 1;
    expect(categoria.id).toBeDefined();
    expect(typeof categoria.id).toBe("number");
  });

  it("should have an optional nombre property of type string", () => {
    categoria.nombre = "example";
    expect(categoria.nombre).toBeDefined();
    expect(typeof categoria.nombre).toBe("string");
  });

  it("should have an optional fecha_creacion property of type Date", () => {
    categoria.fecha_creacion = new Date();
    expect(categoria.fecha_creacion).toBeDefined();
    expect(categoria.fecha_creacion instanceof Date).toBe(true);
  });

  it("should have an optional estado property of type string", () => {
    categoria.estado = "active";
    expect(categoria.estado).toBeDefined();
    expect(typeof categoria.estado).toBe("string");
  });
});
