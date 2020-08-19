import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb/nest')],
  controllers: [],
  providers: [],
})
export class AppModule {}
