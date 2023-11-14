import { RowDataPacket } from "mysql2"

export default interface FacturaDetalle extends RowDataPacket {
  id?: number;
  id_factura?: number;
  id_producto?: number;
  cantidad?: number;
  subtotal?: number;
}