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
        <title>App Orçamento da União</title>
        <meta name="description" content="Created by FGV-ECMI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main >
        <div className={newStyle.centerClose}>
          <Image
          src="/brasao.png"
          width={234.375}
          height={140.625}
          />
        </div>
        <div className={newStyle.centerBlue}>
          
          <div >
            <h1 
            className={inter.className}
            >
              <i>O orçamento público na Blockchain!</i>
            </h1>
          </div>
        </div>
        <div className={newStyle.center}>
          <a
            href='/user'
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={newStyle.buttonApp}> Abrir o App </button>
          </a>
        </div>
        {/* <div className={newStyle.center}> */}
          <div className={newStyle.centerClose}>
            <p><h2>Não confie, verifique!</h2></p>
          </div>
          <div className={newStyle.centerClose}>
            <p className={inter.className}>O <i><b>App Orçamento da União</b></i> move a tecnologia <b>Blockchain</b> <br></br> para 
            a realização de repasses de verba pública conferindo maior trasnparência e celeridade
            ao processo<br></br>assim como a auditorias dele. A tecnologia permite ainda que 
            seja feito o particionamento da verba <br></br>por área de atuação, com os repasses
            sendo controlados por Smart Contracts.          
          </p>
          </div>
        {/* </div> */}
        
        <div className={styles.grid}>
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
      </main>
    </>

  );
}
