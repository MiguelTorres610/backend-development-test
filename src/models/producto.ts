import { RowDataPacket } from "mysql2"

export default interface Producto extends RowDataPacket {
  id?: number;
  precio?: number;
  id_categoria?: number;
  fecha_creacion?: Date;
  estado?: string;
}