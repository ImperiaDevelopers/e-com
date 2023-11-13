import { Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';


@Injectable()
export class StatisticsService {
  constructor(
    private orderService: ,
    private clientService: ClientService
  ){}

}
