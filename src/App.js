import logo from './assets/logo.jpg';
import { useState } from 'react';
import hero from './assets/hero.png';
import hero_geo from './assets/hero_geo3.png';
import gold_opt from './assets/gold-opt.jpg';
import algomall from './assets/AlgoMall_icon.png';
import image1 from './assets/image1.svg';
import image2 from './assets/image2.svg';
import blue_opt from './assets/blue-opt.jpg';
import sdb_opt from './assets/SDB-opt.jpg';
import bro_opt from './assets/bro-opt.jpg';
import image8 from './assets/image8.svg';
import image9 from './assets/image9.svg';
import image10 from './assets/image10.svg';
import image11 from './assets/image11.svg';
import twitter_img from './assets/image12.svg';
import youtube_img from './assets/image13.svg';
import telegram_img from './assets/iconmonstr-telegram-1-48.png';
import litepaper from './assets/litepaper.pdf';
import Modal from './components/Modal';
import './App.css';
import './index.css';

const footerIcon = {
    width: '30px',
    height: '30px',
    marginRight: '20px',
};

function App() {
    const [openModal, setOpenModal] = useState(false);
    const [openMenu, setopenMenu] = useState(false);

    return (
        <div>
            <header>
                <nav>
                    <div className='logo'>
                        <img src={logo} alt='logo' />
                    </div>

                    <div
                        className={`magictime ` + (openMenu ? 'magictime-show' : 'magictime-hide')}
                    >
                        <ul className='magictime-menu'>
                            <li id='token'>
                                <a href='#'>AGM Token</a>
                            </li>
                            <li>
                                <a href={litepaper} target='_blank' rel='noreferrer noopener'>
                                    Litepaper
                                </a>
                            </li>
                            <li>
                                <a href='https://sweepwidget.com/view/40361-yz8uoh7x' id='presale'>
                                    Pre-Sale
                                </a>
                            </li>
                            <li>
                                <button
                                    className='sec_btn'
                                    onClick={() => {
                                        setOpenModal(true);
                                    }}
                                >
                                    Connect Wallet
                                </button>
                            </li>

                            {openModal && <Modal closeModal={setOpenModal} />}
                        </ul>
                    </div>

                    <div className='menu'>
                        <div className='hamburger hamburger--spin'>
                            <div className='hamburger-box'>
                                <div
                                    className='hamburger-inner'
                                    onClick={() => {
                                        console.log('click');
                                        setopenMenu(!openMenu);
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className='hero'>
                    <div className='hero_text'>
                        <h1>
                            Sparking a revolution <br /> in the NFT space
                        </h1>
                        <h4>
                            ALGO MALL aims to become the top tier <br /> NFT marketplace on ALGO
                            network.
                        </h4>
                        <button className='btn' id='collection'>
                            Explore Collections
                        </button>
                    </div>

                    <div className='hero_img'>
                        <img
                            src={hero}
                            alt='NFT marketplace art hero AlgoMall'
                            className='hero_full'
                        />
                        <img
                            src={hero_geo}
                            alt='NFT marketplace art hero AlgoMall'
                            className='hero_mobile'
                        />
                    </div>
                </div>
            </header>

            <div>
                <section className='section_collections'>
                    <h2>COLLECTIONS</h2>
                    <div className='carousel'>
                        <div className='carousel-cell'>
                            <img src={gold_opt} alt='NFT marketplace art collection AlgoMall' />
                            <div className='card_info'>
                                <h1>AGM EXCLUSIVE #1</h1>
                                <h3>205 items</h3>
                                <div className='price'>
                                    <p>
                                        <img src={algomall} alt='algomall-icon' /> <span>450 </span>
                                    </p>
                                    <p>
                                        <img src={image1} alt='algo-icon' />
                                        <span>500</span>{' '}
                                    </p>

                                    <p>
                                        <img src={image2} alt='tether-icon' />
                                        <span>940 </span>{' '}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='carousel-cell'>
                            <img src={blue_opt} alt='NFT marketplace art collection AlgoMall' />
                            <div className='card_info'>
                                <h1>AGM Giveaway NFT</h1>
                                <h3>2700 items</h3>
                                <div className='price'>
                                    <p>
                                        <img src={algomall} alt='algomall-icon' />
                                        <span>45 </span>
                                    </p>

                                    <p>
                                        <img src={image1} alt='algo-icon' />
                                        <span>50</span>{' '}
                                    </p>
                                    <p>
                                        <img src={image2} alt='tether-icon' />
                                        <span>94 </span>{' '}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='carousel-cell'>
                            <img src={sdb_opt} alt='NFT marketplace art collection AlgoMall' />
                            <div className='card_info'>
                                <h1>Slimey Doge Business (SDB)</h1>
                                <h3>10000 items</h3>
                                <div className='price'>
                                    <p>
                                        <img src={algomall} alt='algomall-icon' />
                                        <span>4500 </span>
                                    </p>
                                    <p>
                                        <img src={image1} alt='algo-icon' />
                                        <span>5000</span>{' '}
                                    </p>

                                    <p>
                                        <img src={image2} alt='tether-icon' />
                                        <span>9400 </span>{' '}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='carousel-cell'>
                            <img src={bro_opt} alt='NFT marketplace art collection AlgoMall' />
                            <div className='card_info'>
                                <h1>Retro Brothers NFT</h1>
                                <h3>5000 items</h3>
                                <div className='price'>
                                    <p>
                                        <img src={algomall} alt='algomall-icon' /> <span>90 </span>
                                    </p>

                                    <p>
                                        <img src={image1} alt='algo-icon' />
                                        <span>100</span>{' '}
                                    </p>

                                    <p>
                                        <img src={image2} alt='tether-icon' />
                                        <span>188 </span>{' '}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='section_roadmap'>
                    <div id='particles-js'></div>

                    <div className='rb-container'>
                        <div className='roadmap'>
                            <h1>ROADMAP</h1>
                            <h2>Route towards becoming the top NFT marketplace</h2>
                        </div>

                        <ul className='rb' />
                        <li className='rb-item' ng-repeat='itembx'>
                            <div className='timestamp'>Q4 2021</div>
                            <div className='item'>
                                - Spring of ALGO MALL vision
                                <br />- Presale Whitelist
                                <br />- Presale
                                <br />- Finalized distribution of Presale and Airdrop tokens
                                <br />- Burn of unsold/unclaimed Presale and Airdrop tokens
                                <br />- Official token launch/addition of liquidity
                            </div>
                        </li>

                        <li className='rb-item' ng-repeat='itembx'>
                            <div className='timestamp'>Q1 2022</div>
                            <div className='item'>
                                - NFT Marketplace
                                <br />- Staking Program
                                <br />- Community Campaigns
                                <br />- AGM Hackathon
                                <br />- Tier 1 CEX listings
                            </div>
                        </li>

                        <li className='rb-item' ng-repeat='itembx'>
                            <div className='timestamp'>Q2 2022</div>
                            <div className='item'>
                                - Cross-chain integration to NFT Marketplace
                                <br />- Buy Back and Burn of AGM tokens
                                <br />- NFT Drops for AGM Stakers/Holders
                            </div>
                        </li>

                        <li className='rb-item' ng-repeat='itembx'>
                            <div className='timestamp'>Q3 2022</div>
                            <div className='item'>
                                - AGM GameFi
                                <br />- UI/UX upgrade/revamp
                            </div>
                        </li>
                    </div>
                </section>

                <section className='section_tokenomics'>
                    <div className='lb-container'>
                        <div className='token_text'>
                            <h1>AGM token</h1>
                            <h4>
                                <span>$AGM</span> is the governance token of ALGO MALL NFT
                                Marketplace, with a total issuance of only <span>1,000,000</span>
                                AGM tokens. Use-case of AGM token:
                            </h4>
                        </div>
                        <ul className='timeline'>
                            <li>
                                <img src={image8} alt='' />
                                <p>
                                    Users can transact (buy and sell) NFTs on the marketplace with
                                    AGM tokens{' '}
                                </p>
                            </li>

                            <li>
                                <img src={image9} alt='' />
                                <p>
                                    Holders and Stakers of AGM token will get occasional NFT drops
                                    (especially ALGO MALL themed exclusive NFTs)
                                </p>
                            </li>

                            <li>
                                <img src={image10} alt='' />
                                <p>Store of value</p>
                            </li>

                            <li>
                                <img src={image11} alt='' />
                                <p>
                                    No charge from sale proceeds when users use AGM as mode of
                                    payment
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className='pie_div'>
                        <h1>AGM TOKENOMICS</h1>
                        <myChart />
                        <canvas id='myChart'></canvas>
                    </div>
                </section>

                <footer>
                    <h1>
                        Copyright © 2021 <br /> Algo Mall
                    </h1>
                    <div className='socials'>
                        <a href='https://twitter.com/algomall_art?t=RsgJI2eMjmTcFMzL55ZsOw&s=09'>
                            <img src={twitter_img} alt='twitter-icon' style={footerIcon} />
                        </a>
                        <a href='https://youtube.com/channel/UCRwjtnhZ1Iu6fH3LAncnx6Q'>
                            <img src={youtube_img} alt='youtube-icon' style={footerIcon} />
                        </a>
                        <a href='http://t.me/AlgoMallGroup'>
                            <img src={telegram_img} alt='telegram-icon' style={footerIcon} />
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
