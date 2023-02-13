import React from "react";
import newStyle from '../../styles/new.module.css';
import Image from 'next/image'; 

const Header = (props) => {

    return (
        <>
        <div className='py-10 mb-4 bg-zinc-500 text-white grid lg:grid-cols-2 md:grid-cols-2'>
          <div className='px-3 justify start'>
            <a
              href="/index"
            //   className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
            <h2 className="font-bold italic text-2xl">{props.title}</h2>
            </a>
          </div>
          <div className='pr-4 flex justify-end justify-items-end'>
            <a
              href="https://ecmi.fgv.br/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              <Image
                // className="justify-self-end"
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