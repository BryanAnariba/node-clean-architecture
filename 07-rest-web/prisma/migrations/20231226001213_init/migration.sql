-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "todoName" VARCHAR NOT NULL,
    "completedAt" TIMESTAMP,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);
