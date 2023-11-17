import { ResultSetHeader } from "mysql2/promise";
import connection from "../db";
import Producto from "../models/producto";

const estados = {
  activo: "Activo",
  inactivo: "Inactivo"
};

interface IProductoRepository {
  save(producto: Producto): Promise<string>;
}

class ProductoRepository implements IProductoRepository {
  save(producto: Producto): Promise<string> {
    producto.fecha_creacion = new Date();
    producto.estado = estados.activo;
    return new Promise((resolve, reject) => {
      connection.execute<ResultSetHeader>(
        "INSERT INTO productos(nombre, descripcion, precio, id_categoria, fecha_creacion, estado) VALUES(?,?,?,?,?,?)",
        [producto.nombre, producto.descripcion, producto.precio, producto.id_categoria, producto.fecha_creacion, producto.estado],
        (err, res) => {
          if (err) reject(err);
          else
            resolve("Producto Creado exitosamente" + res)
        }
      );
    });
  }
}

export default new ProductoRepository();
