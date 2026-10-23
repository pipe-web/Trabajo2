import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Equipo } from './entities/equipo.entity';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private readonly equiposRepository: Repository<Equipo>,
  ) {}

  findAll() {
    return this.equiposRepository.find({
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const equipo = await this.equiposRepository.findOneBy({ id });
    if (!equipo) {
      throw new NotFoundException(`Equipo con ID ${id} no encontrado`);
    }
    return equipo;
  }

  async create(createEquipoDto: CreateEquipoDto) {
    const nuevo = this.equiposRepository.create(createEquipoDto);
    return await this.equiposRepository.save(nuevo);
  }

  async update(id: number, updateEquipoDto: UpdateEquipoDto) {
    const equipo = await this.findOne(id);
    Object.assign(equipo, updateEquipoDto);
    return await this.equiposRepository.save(equipo);
  }

  async remove(id: number) {
    const equipo = await this.findOne(id);
    await this.equiposRepository.remove(equipo);
    return { mensaje: 'Equipo eliminado exitosamente', id };
  }
}