import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Machine } from 'src/domain/entities/machines.entity';

class MachineDto implements Partial<Machine> {
  @ApiProperty()
  @Expose()
  id!: string;

  @ApiProperty()
  @Expose()
  location!: string;

  @ApiProperty()
  @Expose()
  isActive!: boolean;

  @ApiProperty()
  @Expose()
  lastDateOfMaintainance!: Date | null;
}

export class MaintainMachineResponseDto {
  @ApiProperty({ type: MachineDto })
  @Expose()
  @Type(() => MachineDto)
  data!: Machine;
}
