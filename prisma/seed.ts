import { PrismaClient, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.quiz.upsert({
        where: { id: 'quiz-boolean-1' },
        update: {},
        create: {
            id: 'quiz-boolean-1',
            title: 'Basics check',
            questions: {
                create: [
                    {
                        id: 'q-boolean-1',
                        type: QuestionType.BOOLEAN,
                        prompt: '2 + 2 = 4?',
                        order: 1,
                        correctBoolean: true
                    }
                ]
            }
        }
    });

    await prisma.quiz.upsert({
        where: { id: 'quiz-mixed-1' },
        update: {},
        create: {
            id: 'quiz-mixed-1',
            title: 'Mixed quiz',
            questions: {
                create: [
                    {
                        id: 'q-input-1',
                        type: QuestionType.INPUT,
                        prompt: 'Name base RGB colors',
                        order: 1,
                        acceptableAnswers: ['red', 'blue', 'green']
                    },
                    {
                        id: 'q-checkbox-1',
                        type: QuestionType.CHECKBOX,
                        prompt: 'Pick vowel letters',
                        order: 2,
                        options: {
                            create: [
                                { id: 'opt-a', label: 'A', isCorrect: true, order: 1 },
                                { id: 'opt-b', label: 'B', isCorrect: false, order: 2 },
                                { id: 'opt-e', label: 'E', isCorrect: true, order: 3 }
                            ]
                        }
                    }
                ]
            }
        }
    });

    console.log('✅ Seed completed');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
