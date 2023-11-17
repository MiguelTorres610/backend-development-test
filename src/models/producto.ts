
export default interface Producto {
  id?: number;
  nombre?: string;
  descripcion: string;
  precio?: number;
  id_categoria?: number;
  fecha_creacion?: Date;
  estado?: string;
  cantidad: number;
}