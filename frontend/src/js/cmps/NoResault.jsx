import notfound from '../../assets/img/not-found/notfound.png';

export function NoResault() {
  return (
    <div className="no-reasult flex column auto-center">
      <img src={notfound} alt="no-resaults" />
      No results found in this board
    </div>
  );
}
