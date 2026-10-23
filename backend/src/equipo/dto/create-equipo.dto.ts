import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum EstadoEquipo {
  DISPONIBLE = 'Disponible',
  EN_USO = 'En uso',
  MANTENCION = 'Mantención',
  BAJA = 'Baja',
}

export class CreateEquipoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'El código debe tener al menos 3 caracteres' })
  codigoInventario: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsString()
  @IsNotEmpty()
  ubicacion: string;

  @IsEnum(EstadoEquipo, {
    message: 'El estado solo puede ser: Disponible, En uso, Mantención o Baja',
  })
  estado: EstadoEquipo;

  @IsString()
  @IsNotEmpty()
  fechaAdquisicion: string;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
