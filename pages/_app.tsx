import Model from '@/components/Model'
import Layout from '../components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import LoginModel from '@/components/LoginModel'
import RegisterModel from '@/components/RegisterModel'
import {Toaster} from 'react-hot-toast';
import {SessionProvider} from 'next-auth/react';
import EditModel from '@/components/EditModel'

export default function App({ Component, pageProps }: AppProps) {
  return (

    <SessionProvider session={pageProps.session}>
    <EditModel/>
    <RegisterModel/>
      <LoginModel/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
