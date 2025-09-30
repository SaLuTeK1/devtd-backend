import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PrismaModule} from './prisma/prisma.module';
import {QuizzesModule} from './quizzes/quizzes.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [PrismaModule, QuizzesModule, ConfigModule.forRoot({
        isGlobal: true
    })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
