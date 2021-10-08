export function NumberFooter({
  toggleMenus,
  toggleMenu,
  columnIdx,
  column,
  group,
  board,
}) {
  const calcNumbers = (func) => {
    const numbers = [];
    group.items.forEach((item) => {
      const number = item.columns[columnIdx].number;
      if (number) numbers.push(number);
    });
    if (!numbers.length) return 0;
    console.log(`numbers`, numbers);
    switch (func) {
      case 'avg':
        return numbers.reduce((acc, num) => acc + num) / numbers.length;

      case 'sum':
        return numbers.reduce((acc, num) => acc + num, 0);

      case 'min':
        return Math.min(...numbers);

      case 'max':
        return Math.max(...numbers);

      case 'count':
        return numbers.length;

      default:
        break;
    }
  };

  return (
    <div
      style={{ minWidth: column.width }}
      className="number-footer btn"
      onClick={(ev) => {
        ev.preventDefault();
        toggleMenu(toggleMenus, 'numberMenu', group.id);
      }}
    >
      <div className="number flex auto-center">
        {calcNumbers(column.function)}
      </div>
      <div className="function flex auto-center">{column.function}</div>
    </div>
  );
}
