export default function Popup({message, isOpen, onClose}) {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn" onClick={onClose}></button>
        <p className="popup__paragraph">{message}</p>
      </div>
    </div>
  );
}
