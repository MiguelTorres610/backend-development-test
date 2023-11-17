import { ResultSetHeader } from "mysql2/promise";
import connection from "../db";
import Categoria from "../models/categoria";

const estados = {
  activo: "Activo",
  inactivo: "Inactivo"
};

interface ICategoriaRepository {
  save(categoria: Categoria): Promise<string>;
}

class CategoriaRepository implements ICategoriaRepository {
  save(categoria: Categoria): Promise<string> {
    categoria.fecha_creacion = new Date();
    categoria.estado = estados.activo;
    return new Promise((resolve, reject) => {
      connection.execute<ResultSetHeader>(
        "INSERT INTO categorias(nombre, descripcion, fecha_creacion, estado) VALUES(?,?,?,?)",
        [categoria.nombre, categoria.descripcion, categoria.fecha_creacion, categoria.estado],
        (err, res) => {
          if (err) reject(err);
          else
            resolve("Categoria Creada exitosamente" + res)
        }
      );
    });
  }
}

export default new CategoriaRepository();
