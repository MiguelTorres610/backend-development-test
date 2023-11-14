import { RowDataPacket } from "mysql2"

export default interface Factura extends RowDataPacket {
  id?: number;
  id_comprador?: number;
  costo_total?: number;
  fecha_creacion?: Date;
  estado?: string;
}