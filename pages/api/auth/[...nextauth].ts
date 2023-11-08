import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import   CredentialsProvider   from 'next-auth/providers/credentials';
import {PrismaAdapter} from '@next-auth/prisma-adapter';


import prisma from '@/libs/prisma'


const credentialsProvider = CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'text' },
      password: {  label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      if (!credentials.email || !credentials.password) {
        throw new Error('Invalid credentials');
      }
  
      const user = await prisma.user.findUnique({
        where: {
          email: credentials.email,
        },
      });
  
      if (!user || !user.hashedPassword) {
        throw new Error('Invalid credentials');
      }
  
      const isCorrectPassword = await bcrypt.compare(
        credentials.password,
        user.hashedPassword
      );
  
      if (!isCorrectPassword) {
        throw new Error('Invalid password');
      }
  
      return user;
    },
  });



export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [credentialsProvider],
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
    });


