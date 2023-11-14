import { ResultSetHeader } from "mysql2/promise";
import connection from "../db";
import FacturaDetalle from "../models/factura.detalle";

interface IFacturaDetalleRepository {
  save(facturaDetalle: FacturaDetalle): Promise<String>;
}

class FacturaDetalleRepository implements IFacturaDetalleRepository {
  save(facturaDetalle: FacturaDetalle): Promise<String> {
    return new Promise((resolve, reject) => {
      connection.query<ResultSetHeader>(
        "INSERT INTO facturas_detalle(id_factura, id_producto, cantidad, subtotal) VALUES(?,?,?,?)",
        [facturaDetalle.id_comprador, facturaDetalle.id_producto, facturaDetalle.fecha_creacion, facturaDetalle.estado],
        (err, res) => {
          if (err) reject(err);
          else
            resolve("Detalle de factura creada exitosamente")
        }
      );
    });
  }

}

export default new FacturaDetalleRepository();
