import { ResultSetHeader } from "mysql2/promise";
import connection from "../db";
import FacturaDetalle from "../models/factura.detalle";

interface IFacturaDetalleRepository {
  save(facturaDetalle: FacturaDetalle): Promise<string>;
}

class FacturaDetalleRepository implements IFacturaDetalleRepository {
  save(facturaDetalle: FacturaDetalle): Promise<string> {
    return new Promise((resolve, reject) => {
      connection.execute<ResultSetHeader>(
        "INSERT INTO facturas_detalle(id_factura, id_producto, cantidad, subtotal) VALUES(?,?,?,?)",
        [facturaDetalle.id_factura, facturaDetalle.id_producto, facturaDetalle.cantidad, facturaDetalle.subtotal],
        (err, res) => {
          if (err) reject(err);
          else
            resolve("Detalle de factura creada exitosamente" + res)
        }
      );
    });
  }
}

export default new FacturaDetalleRepository();
