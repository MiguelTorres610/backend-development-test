import { ResultSetHeader } from "mysql2/promise";
import connection from "../db";
import Factura from "../models/factura";

const estados = {
  activo: "Activo",
  inactivo: "Inactivo"
};

interface IFacturaRepository {
  save(factura: Factura): Promise<String>;
}

class FacturaRepository implements IFacturaRepository {
  save(factura: Factura): Promise<String> {
    factura.fecha_creacion = new Date();
    factura.estado = estados.activo;
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO facturas(nombre, descripcion, fecha_creacion, estado) VALUES(?,?,?,?)",
        [factura.id_comprador, factura.costo_total, factura.fecha_creacion, factura.estado],
        (err, res) => {
          if (err) reject(err);
          else
            resolve("Categoria Creada exitosamente")
        }
      );
    });
  }
}

export default new FacturaRepository();
