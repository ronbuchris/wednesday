import { queryColors } from '../../services/label.service';

export function StatusColorPalette({
  onEditLabel,
  hoverColor,
  onAddLabel,
  statusIdx,
  setColor,
  board,
}) {
  const getColors = () => {
    const statusIdx = board.columns.findIndex((col) => col.type === 'status');
    const takenColors = board.columns[statusIdx].labels.map(
      (label) => label.color
    );
    const colors = queryColors().filter((color) => {
      return !takenColors.includes(color);
    });
    return colors;
  };

  return (
    <div className="status-cange-color flex">
      {getColors().map((color) => {
        return (
          <div
            key={color}
            onMouseOver={() => {
              setColor((prevState) => {
                return { ...prevState, color };
              });
            }}
            onMouseLeave={() =>
              setColor((prevState) => {
                return { ...prevState, color: null };
              })
            }
            onClick={() => {
              hoverColor.idx || hoverColor.idx === 0
                ? onEditLabel(statusIdx(), color, hoverColor.idx, 'color')
                : onAddLabel(statusIdx(), color);
              setColor((prevState) => {
                return { ...prevState, idx: null };
              });
            }}
            className="color-icon btn"
            style={{ backgroundColor: color }}
          ></div>
        );
      })}
    </div>
  );
}
