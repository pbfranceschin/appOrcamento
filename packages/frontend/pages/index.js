import Head from 'next/head';
import Image from 'next/image';
// import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';


// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>App Orçamento da União 2023</title>
        <meta name="description" content="Created by FGV-ECMI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fgv.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <a
            href="/user"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2>Abrir o app</h2>
          </a>
          <div>
            <a
              href="https://ecmi.fgv.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Desenvolvimento{' '}
              <Image
                src="/fgv_logo_branco.png"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <div><h1><i>App Orçamento da União 2023</i></h1></div>
        </div>
        
        <div className={styles.grid}>
          <a
            href=""
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <h2 className={inter.className}> */}
            <h2>
              Transparência <span>-&gt;</span>
            </h2>
            {/* <p className={inter.className}> */}
            <p>
              Facilita o rastreio do dinheiro público pela da sociedade civil.
            </p>
          </a>

          <a
            href=""
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <h2 className={inter.className}> */}
            <h2>
              Resiliência <span>-&gt;</span>
            </h2>
            {/* <p className={inter.className}> */}
            <p>
              Garante alta integridade dos dados através da decentralização.
            </p>
          </a>

          <a
            href=""
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <h2 className={inter.className}> */}
            <h2>
              Eficiência <span>-&gt;</span>
            </h2>
            {/* <p className={inter.className}> */}
            <p>
              Diminui custos através da desintermediação dos bancos.
            </p>
          </a>

          <a
            href=""
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* <h2 className={inter.className}> */}
            <h2>
              Controle <span>-&gt;</span>
            </h2>
            {/* <p className={inter.className}> */}
            <p>
              Condicionamento dos repasses através de smart contracts
            </p>
          </a>
        </div>
      </main>
    </>

  );
}
