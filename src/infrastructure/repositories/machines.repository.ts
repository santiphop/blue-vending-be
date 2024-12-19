import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Machine, MachineCreation } from 'src/domain/entities/machines.entity';

@Injectable()
export class MachinesRepository {
  constructor(
    @InjectRepository(Machine)
    private readonly machinesRepository: Repository<Machine>,
  ) {}

  findOneById(id: string): Promise<Machine | null> {
    return this.machinesRepository.findOne({
      where: { id },
    });
  }

  create(machineData: MachineCreation): Promise<Machine> {
    const newMachineEntity = this.machinesRepository.create(machineData);
    return this.machinesRepository.save(newMachineEntity);
  }

  deactivate(machine: Machine): Promise<Machine> {
    machine.isActive = false;
    return this.machinesRepository.save(machine);
  }

  activate(machine: Machine): Promise<Machine> {
    machine.isActive = true;
    machine.lastDateOfMaintainance = new Date();
    return this.machinesRepository.save(machine);
  }
}
