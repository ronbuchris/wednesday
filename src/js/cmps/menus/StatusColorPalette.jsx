import { queryColors } from '../../services/label.service';

export function StatusColorPalette({
  onEditLabel,
  hoverColor,
  onAddLabel,
  statusIdx,
  setColor,
}) {
  return (
    <div className="status-cange-color flex auto-center">
      {queryColors().map((color) => {
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
