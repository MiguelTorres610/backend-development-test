
export default interface Comprador {
  id?: number;
  nombre?: string;
  apellido?: string;
  email: string;
  direccion: string;
  fecha_creacion?: Date;
  estado?: string;
}
