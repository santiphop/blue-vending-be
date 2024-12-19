import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { SerializeResponse } from 'src/infrastructure/interceptors/serialize-response.interceptor';

import { Machine } from 'src/domain/entities/machines.entity';
import { CreateMachineResponseDto } from './dtos/create-machine.response';
import { CreateMachineRequestDto } from './dtos/create-machine.request';
import { MaintainMachineResponseDto } from './dtos/maintain-machine.response';
import { MaintainMachinePathParamDto } from './dtos/maintain-machine.request';
import { CreateMachineUseCases } from 'src/usecases/machine/create-machine.usecases';
import { MaintainMachineUseCases } from 'src/usecases/machine/maintain-machine.usecases';

@ApiTags('Machines')
@Controller({ path: 'machines', version: '1' })
export class MachinesController {
  constructor(
    private createMachineUseCases: CreateMachineUseCases,
    private maintainMachineUseCases: MaintainMachineUseCases,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    description: 'Create Machine',
    status: HttpStatus.CREATED,
    type: CreateMachineResponseDto,
  })
  @SerializeResponse(CreateMachineResponseDto)
  async createMachine(
    @Body() requestDto: CreateMachineRequestDto,
  ): Promise<{ data: Machine }> {
    return {
      data: await this.createMachineUseCases.createMachine(requestDto),
    };
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Maintain Machine',
    status: HttpStatus.OK,
    type: MaintainMachineResponseDto,
  })
  @SerializeResponse(MaintainMachineResponseDto)
  async maintainMachine(
    @Param() requestDto: MaintainMachinePathParamDto,
  ): Promise<{ data: Machine }> {
    return {
      data: await this.maintainMachineUseCases.finishMaintainMachine(
        requestDto.id,
      ),
    };
  }
}
