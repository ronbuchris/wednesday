import { queryColors } from '../../services/column.service';

export function StatusColorPalette() {
  return (
    <div className="status-cange-color flex align-center justify-center">
      {queryColors().map((color) => {
        return (
          <div
            className="color-icon btn"
            style={{ backgroundColor: color }}
          ></div>
        );
      })}
    </div>
  );
}
