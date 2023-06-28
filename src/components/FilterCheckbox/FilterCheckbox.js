export default function FilterCheckbox({text, сheckedInitial, handleClick}) {
  return (
    <label className="filter-checkbox">
      <input className="filter-checkbox__hidden" type="checkbox" defaultChecked={сheckedInitial} onChange={e => handleClick(e.target.checked)}></input>
      <span className="filter-checkbox__slider"></span>
      <span className="filter-checkbox__text">{text}</span>
    </label>
  );
}
