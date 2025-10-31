import './RecipientInfo.css';

export const RecipientInfo = ({ recipient, resetRecipient }) => {
  return (
    <div className='recipient-info'>
      <div className='recipient-info_user'>
        <img src={recipient.photo} alt={recipient.name} />
        <h4>{recipient.name}</h4>
      </div>
      <button onClick={resetRecipient} className='transparentBtn reset-recipient-button'>
        <svg viewBox="0 0 10 10" width="20" height="20" stroke="currentColor" stroke-width="1.5">
          <line x1="1" y1="1" x2="9" y2="9" />
          <line x1="9" y1="1" x2="1" y2="9" />
        </svg>
      </button>
    </div>
  );
}