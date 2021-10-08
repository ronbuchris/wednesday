export function NumberMenu() {
  return (
    <div className="menu-modal number-menu">
      <div className="units">
        <div className="unit-title title">Unit</div>
        <div className="unit-list list flex">
          <div className="symbol">$</div>
          <div className="symbol selected">%</div>
          <div className="symbol">₪</div>
        </div>
      </div>
      <div className="functions">
        <div className="function-title title">Function</div>
        <div className="function-list list flex">
          <div className="avg btn flex auto-center selected">Average</div>
          <div className="sum btn flex auto-center">Sum</div>
          <div className="min btn flex auto-center">Min</div>
          <div className="max btn flex auto-center ">Max</div>
          <div className="count btn flex auto-center ">Count</div>
        </div>
      </div>
    </div>
  );
}
