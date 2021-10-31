export function NumberMenu({ board, column, group, onEditBoard }) {
  const changeUnit = (value) => {
    if (value === 'none') value = '';
    column.unit = value;
    onEditBoard(board);
  };

  const ChangeFunc = (value) => {
    column.function = value;
    onEditBoard(board);
  };
  const findIdx = (type) => {
    const idx = board.cmpsOrder.findIndex((column) => column === type);
    return idx;
  };

  const units = ['$', '%', '₪', '€'];
  const functions = ['average', 'sum', 'min', 'max', 'count'];

  return (
    <div className="menu-modal number-menu">
      <div className="units">
        <div className="unit-title title">Unit</div>
        <div className="unit-list list flex">
          <div
            className={`symbol btn flex auto-center ${
              board.columns[findIdx('number')].unit === '' ? 'selected' : ''
            }`}
            onClick={() => changeUnit('')}
          >
            None
          </div>
          {units.map((unit) => {
            return (
              <div
                className={`symbol btn flex auto-center ${
                  board.columns[findIdx('number')].unit === unit
                    ? 'selected'
                    : ''
                }`}
                key={unit}
                onClick={() => changeUnit(unit)}
              >
                {unit}
              </div>
            );
          })}
        </div>
      </div>
      <div className="functions">
        <div className="function-title title">Function</div>
        <div className="function-list list flex">
          {functions.map((func) => {
            return (
              <div
                key={func}
                onClick={() => ChangeFunc(func)}
                className={`sum btn flex auto-center ${
                  board.columns[findIdx('number')].function === func
                    ? 'selected'
                    : ''
                }`}
              >
                {func}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
