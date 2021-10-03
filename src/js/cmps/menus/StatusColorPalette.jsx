import { queryColors } from '../../services/label.service';

export function StatusColorPalette({
  setColor,
  hoverColor,
  onAddLabel,
  statusIdx,
  onEditLabel
}) {
  return (
    <div className="status-cange-color flex align-center justify-center">
      {queryColors().map((color) => {
        return (
          <div
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
              hoverColor.idx
                ? onEditLabel(statusIdx(), color)
                : onAddLabel(statusIdx(), color);
            }}
            className="color-icon btn"
            style={{ backgroundColor: color }}
          ></div>
        );
      })}
    </div>
  );
}
