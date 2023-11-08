import {PrismaClient} from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
// this is an environment check
if(process.env.NODE_ENV != 'production') globalThis.prisma = client;

export default client;
