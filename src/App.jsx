import { useState, useEffect } from 'react';
import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { BuyStarsForm } from './components/BuyStarsForm';

function App() {
  const [tonRate, setTonRate] = useState(null);
  
  useEffect(() => {
    fetch('/api/payments/tonRate')
      .then(async res => {
        const data = await res.json();
        if (data.ok) setTonRate(data.ton_rate);
      });
  }, []);

  return (
    <>
      <header>
        <TonConnectButton style={{ float: "right" }}/>
      </header>
      <div className="wrapper">
        <h1 className="title">
          Buy <span className="gradient-text">Telegram Stars</span> without KYC and <span style={{ color: '#0091ff' }}>0% fees</span>
        </h1>
        <div className="content">
          <BuyStarsForm tonRate={tonRate} />
        </div>
      </div>
    </>
  );
}

export default App;
