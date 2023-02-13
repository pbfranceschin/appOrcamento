import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import newStyle from '../styles/new.module.css';
import Header from './itens/Header'

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Orçamento Público | FGV-ECMI</title>
        <meta name="description" content="Desenvolvido por FGV-ECMI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title='App Orçamento Público' />
      <main >
        <div className='flex justify-center py-6'>
          <Image
          src="/brasao.png"
          alt='brasao_brasil'
          width={234.375}
          height={140.625}
          />
        </div>
        <div className='flex justify-center py-6'>
          
          <div >
            <h1 
            className="font-bold text-slate-400 text-2xl lg:text-4xl md:text-4xl"
            >
              <i>O orçamento público na Blockchain!</i>
            </h1>
          </div>
        </div>
        <div className='flex justify-center py-6 pb-20'>
          <a
            href='/user'
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
            className="bg-zinc-600 hover:bg-slate-500 text-white font-bold py-2 px-4 border border-blue-700 rounded shadow-xl"
          >
              Abrir o App
            </button>
          </a>
        </div>
        <div className="pb-9">
          <div className='flex justify-center'>
            <h2 className='font-bold text-2xl pb-2 subpixel-antialiased text-zinc-500'>Não confie, verifique!</h2>
          </div>
          <div className={newStyle.centerClose}>
            <p className="text-sm subpixel-antialiased font-light">O <i><b>App Orçamento da União</b></i> move a tecnologia <b>Blockchain</b> <br></br> para 
            a realização de repasses de verba pública conferindo maior trasnparência e celeridade
            ao processo<br></br>assim como a auditorias dele. A tecnologia permite ainda que 
            seja feito o particionamento da verba <br></br>por área de atuação, com os repasses
            sendo controlados por Smart Contracts.          
          </p>
          </div>
        </div>
        
        <div className='pt-10 px-12 grid justify-center lg:grid-cols-4 gap-8 md:grid-cols-2'>
          {/* <div className='grid grid-rows-2'> */}
            <div className='rounded-md shadow-md px-3 bg-slate-400 text-white hover:bg-white hover:text-black'>
              <a
                href=""
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={inter.className}>
                {/* <h2> */}
                  Transparência <span>-&gt;</span>
                </h2>
                <p className={inter.className}>
                {/* <p> */}
                  Facilita o rastreio do dinheiro público pela da sociedade civil.
                </p>
              </a>
            </div>
            <div className='rounded-md shadow-md px-3 bg-zinc-500 text-white hover:bg-white hover:text-black'>
              <a
                href=""
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={inter.className}>
                {/* <h2> */}
                  Resiliência <span>-&gt;</span>
                </h2>
                <p className={inter.className}>
                {/* <p> */}
                  Garante alta integridade dos dados através da decentralização.
                </p>
              </a>
            </div>
          {/* </div> */}
          {/* <div className='grid grid-rows-2'> */}
            <div className='rounded-md shadow-md px-3 bg-zinc-500 text-white hover:bg-white hover:text-black'>
              <a
                href=""
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={inter.className}>
                {/* <h2> */}
                  Eficiência <span>-&gt;</span>
                </h2>
                <p className={inter.className}>
                {/* <p> */}
                  Diminui custos através da desintermediação dos bancos.
                </p>
              </a>
            </div>
            <div className='rounded-md shadow-md px-3 bg-slate-400 text-white hover:bg-white hover:text-black'>
              <a
                href=""
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className={inter.className}>
                {/* <h2> */}
                  Controle <span>-&gt;</span>
                </h2>
                <p className={inter.className}>
                {/* <p> */}
                  Condicionamento dos repasses através de smart contracts
                </p>
              </a>
            </div>
          {/* </div> */}
        </div>
      </main>
    </>

  );
}
