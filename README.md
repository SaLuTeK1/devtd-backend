# 1) Download dependencies
npm i

# 2) Create .env from example
cp .env.example .env

# 3) Run DB with Docker
docker compose up

# 4) Generate Prisma Client + migrations
npx prisma generate
npx prisma migrate dev

# 5) Fill db with info
npx prisma db seed 
# or
npx ts-node -T prisma/seed.ts

# 6) Run NestJS in dev-mode
npm run dev
