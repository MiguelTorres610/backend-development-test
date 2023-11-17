import { ResultSetHeader } from "mysql2/promise";
import connection from "../db";
import Factura from "../models/factura";

const estados = {
  activo: "Activo",
  inactivo: "Inactivo"
};

interface IFacturaRepository {
  save(factura: Factura): Promise<Factura>;
  getItemByid(params: { idFactura?: number, idComprador?: number }): Promise<ResultSetHeader[]>
}

class FacturaRepository implements IFacturaRepository {
  save(factura: Factura): Promise<Factura> {
    factura.fecha_creacion = new Date();
    factura.estado = estados.activo;
    return new Promise((resolve, reject) => {
      connection.execute<ResultSetHeader>(
        "INSERT INTO facturas(id_comprador, costo_total, fecha_creacion, estado) VALUES(?,?,?,?)",
        [factura.id_comprador, factura.costo_total, factura.fecha_creacion, factura.estado],
        (err, res) => {
          if (err) reject(err);
          else
            factura.id = res.insertId;
          resolve(factura)
        }
      );
    });
  }

  getItemByid(params: { idFactura?: number, idComprador?: number }): Promise<ResultSetHeader[]> {
    let query: string =
      "SELECT productos.nombre, productos.descripcion, categorias.nombre as categoria, productos.precio, facturas_detalle.cantidad, facturas_detalle.subtotal, facturas.costo_total " +
      "FROM facturas " +
      "JOIN facturas_detalle ON facturas_detalle.id_factura = facturas.id " +
      "JOIN productos ON productos.id = facturas_detalle.id_producto " +
      "JOIN categorias ON categorias.id = productos.id_categoria ";

    let condition: string = "";
    if (params?.idFactura)
      condition += `WHERE facturas.id = '${params.idFactura}'`
    else if (params?.idComprador)
      condition += `WHERE facturas.id_comprador = '${params.idComprador}'`

    if (condition.length)
      query += condition;
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}

export default new FacturaRepository();
