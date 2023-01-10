import React from "react";
import newStyle from '../../styles/new.module.css';
import Image from 'next/image'; 

const Header = () => {

    return (
        <>
        <div className={newStyle.header}>
          <div className='header'>
            <a
              href="/index"
            //   className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
            <h2 className="font-bold"><i>Rastreador do Orçamento</i></h2>
            </a>
          </div>
          <div className={newStyle.headerRight}>
            <a
              href="https://ecmi.fgv.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              <Image
                src="/FGV_branco.png"
                alt="logo"
                width={120}
                height={36}
                priority
              />
            </a>
          </div>
        </div>

        </>
    )
}

export default Header;