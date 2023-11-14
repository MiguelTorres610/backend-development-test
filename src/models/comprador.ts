import { RowDataPacket } from "mysql2"

export default interface Comprador extends RowDataPacket {
  id?: number;
  nombre?: string;
  apellido?: string;
  email: string;
  direccion: string;
  fecha_creacion?: Date;
  estado?: string;
}
