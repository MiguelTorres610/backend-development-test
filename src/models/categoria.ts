import { RowDataPacket } from "mysql2"

export default interface Categoria extends RowDataPacket {
  id?: number;
  nombre?: string;
  descripcion: string;
  fecha_creacion?: Date;
  estado?: string;
}