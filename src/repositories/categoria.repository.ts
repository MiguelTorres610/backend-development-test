import { ResultSetHeader } from "mysql2/promise";
import connection from "../db";
import Categoria from "../models/categoria";

const estados = {
  activo: "Activo",
  inactivo: "Inactivo"
};

interface ICategoriaRepository {
  save(categoria: Categoria): Promise<String>;
}

class CategoriaRepository implements ICategoriaRepository {
  save(categoria: Categoria): Promise<String> {
    categoria.fecha_creacion = new Date();
    categoria.estado = estados.activo;
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO categorias(nombre, descripcion, fecha_creacion, estado) VALUES(?,?,?,?)",
        [categoria.nombre, categoria.descripcion, categoria.fecha_creacion, categoria.estado],
        (err, res) => {
          if (err) reject(err);
          else
            resolve("Categoria Creada exitosamente")
        }
      );
    });
  }
}

export default new CategoriaRepository();
