import { ResultSetHeader } from "mysql2/promise";
import connection from "../db";
import Comprador from "../models/comprador";

const estados = {
  activo: "Activo",
  inactivo: "Inactivo"
};

interface ICompradorRepository {
  save(comprador: Comprador): Promise<string>;
}

class CompradorRepository implements ICompradorRepository {
  save(comprador: Comprador): Promise<string> {
    comprador.fecha_creacion = new Date();
    comprador.estado = estados.activo;
    return new Promise((resolve, reject) => {
      connection.execute<ResultSetHeader>(
        "INSERT INTO compradores(nombre, apellido, email, direccion, fecha_creacion, estado) VALUES(?,?,?,?,?,?)",
        [comprador.nombre, comprador.apellido, comprador.direccion, comprador.email, comprador.fecha_creacion, comprador.estado],
        (err, res) => {
          if (err) reject(err);
          else
            resolve("Comprador Creado exitosamente" + res)
        }
      );
    });
  }
}

export default new CompradorRepository();
