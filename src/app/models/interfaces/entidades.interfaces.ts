interface Cliente {
  id?: number;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  email?: string;
  notas?: string;
  tipoCliente?: TipoCliente;
  pedidos?: Pedido[];
}

interface Pedido {
    id?:number;
    direccionEntrega?:string;
    notas?:string;
    fechaEntrada?:string;
    fechaEntrega?:string;
    cliente?:Cliente;
    muebles?:Mueble[]
}

interface Mueble {
    id?: number;
    largo?: number;
    alto?: number;
    profundidad?: number;
    cantidad?: number;
    notas?: string;
    color?: Color;
    modelo?: Modelo;
    pedido?: Pedido;
    estado?: Estado;
}


interface TipoCliente {
  id?: number;
  nombre?: string;
}

interface Estado {
    id?: number;
    nombre?: string;
}

interface Modelo {
    id?: number;
    nombre?: string;
}

interface Color {
    id?: number;
    nombre?: string;
    hex_referencia?: string;
}

interface EstadoHistorico {
    id?: number;
    id_mueble?: number;
    estado?: Estado;
    fecha?: number;
}

interface Usuario {
    id?:number;
    username?:string;
    password?:string
}

export {
    Cliente,
    Pedido,
    Mueble,
    TipoCliente,
    Estado,
    Modelo,
    Color,
    EstadoHistorico,
    Usuario
}