import { Module } from "@nestjs/common";
import { CardService } from "./card.service";
import { CardController } from "./card.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Card } from "./models/card.model";

@Module({
  imports: [SequelizeModule.forFeature([Card])],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
