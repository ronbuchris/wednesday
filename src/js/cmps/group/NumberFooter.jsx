export function NumberFooter({
  toggleMenus,
  toggleMenu,
  columnIdx,
  column,
  group,
  board,
}) {
  const calcNumbers = (func) => {
    console.log(`func`, func);
    const numbers = group.items.filter(
      (item) => item.columns[columnIdx]?.number
    );
    if (!numbers.length) return 0;
    console.log(`numbers`, numbers);
    switch (func) {
      case 'avg':
        return (
          numbers.reduce((acc, num) => acc + num.columns[columnIdx].number) /
          numbers.length
        );

      case 'sum':
        return numbers.reduce(
          (acc, num) => acc + num.columns[columnIdx]?.number
        );

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
      {/* <div className="number">{calcNumbers(column.function)}</div> */}
      <div className="function">{column.function}</div>
    </div>
  );
}
