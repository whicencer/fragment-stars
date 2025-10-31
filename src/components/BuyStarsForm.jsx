import { useState, useEffect } from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { displayPrice } from "../helpers/displayPrice";
import { RecipientInfo } from "./RecipientInfo";
import { LoaderSpinner } from "./LoaderSpinner";
import { useRecipient } from "../store/useRecipient";
import { useTransaction } from "../store/useTransaction";

export const BuyStarsForm = ({ tonRate }) => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [recipientUsername, setRecipientUsername] = useState('');
  const [starsAmount, setStarsAmount] = useState(50);
  const {
    recipient,
    recipientError,
    isRecipientLoading,
    resetRecipient,
    searchRecipient
  } = useRecipient();
  const {
    transaction,
    transactionError,
    isTransactionLoading,
    createTransaction
  } = useTransaction();

  const isButtonLoading = isRecipientLoading || isTransactionLoading;
  const mainButtonDisabled = starsAmount < 50
    || starsAmount > 1000000
    || !recipient
    || !wallet;

  useEffect(() => {
    if (transaction) {
      tonConnectUI.sendTransaction(transaction);
    }
  }, [transaction, tonConnectUI]);
  
  return (
    <div className="content_form">
      <div>
        <label htmlFor="recipient_input" className="label">Choose recipient</label>
        {
          !recipient
            ? <input
                id="recipient_input"
                className="input"
                placeholder="Enter Telegram username"
                value={recipientUsername}
                onChange={(event) => setRecipientUsername(event.target.value)}
                onBlur={() => searchRecipient({ username: recipientUsername })}
              />
            : <RecipientInfo
                recipient={recipient}
                resetRecipient={() => {
                  resetRecipient();
                  setRecipientUsername('');
                }}
              />
        }
        <p style={{ color: 'rgb(205, 75, 75)' }}>{recipientError}</p>
      </div>
      <div>
        <label htmlFor="stars_amount_input" className="label">Choose amount of Telegram Stars</label>
        <input
          id="stars_amount_input"
          className="input"
          placeholder="Enter amount from 50 to 1,000,000"
          value={starsAmount}
          onChange={(event) => setStarsAmount(parseInt(event.target.value))}
        />
        {
          starsAmount >= 50 && starsAmount <= 1000000
            ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginLeft: 5, marginTop: 5 }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="19" viewBox="0 0 15 19" width="15">
                  <path d="m1.74 4.5h11.51c.24 0 .44.2.44.44 0 .08-.02.15-.05.22l-5.46 9.9c-.24.43-.78.59-1.21.35-.15-.08-.27-.21-.36-.36l-5.26-9.9c-.12-.21-.04-.48.18-.6.07-.03.14-.05.21-.05zm5.76 10.67v-10.67z" fill="none" stroke="#4db2ff" stroke-width="1.5"/>
                </svg>
                <span style={{ fontWeight: 600 }}>
                  {displayPrice(starsAmount, tonRate)}
                </span>
              </div>
            )
            : <span style={{ color: 'rgb(205, 75, 75)' }}>You can buy only between 50 and 1,000,000 stars</span>
        }
      </div>
      <button
        style={{ marginTop: 20 }}
        className="main-button"
        disabled={mainButtonDisabled}
        onClick={() => createTransaction({
          recipient_id: recipient.recipient_id,
          quantity: starsAmount,
          account: wallet.account
        })}
      >
        {
          isButtonLoading
            ? <LoaderSpinner />
            : `Buy ${starsAmount} Telegram Stars`
        }
      </button>
      <p style={{ color: 'rgb(205, 75, 75)' }}>{transactionError}</p>
    </div>
  );
}
