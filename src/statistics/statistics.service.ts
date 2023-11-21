// import { Injectable } from '@nestjs/common';
// import { OrderService } from '../order/order.service';
// import { ClientService } from '../client/client.service';
// import { Order } from '../order/models/order.model';

// @Injectable()
// export class StatisticsService {
//   constructor(
//     private orderService: OrderService,
//     private clientService: ClientService,
//   ) {}

//   async getMain(client_id: number): Promise<number> {
//     try {
//       // Используйте метод findOne вашей службы clientService
//       const user = await this.clientService.findAll({
//         include: [
//           {
//             model: Order,
//             attributes: ['card_id'],
//           },
//         ],
//       });

//       // Используйте метод sum вашей модели Order
//       const totalAmount = await Order.sum('card_id', {
//         where: { client_id },
//       });

//       // Если totalAmount не определено, вернуть 0
//       return totalAmount || 0;
//     } catch (error) {
//       // Обработка ошибок, если необходимо
//       console.error('Error in getMain:', error);
//       throw error;
//     }
//   }
// }
