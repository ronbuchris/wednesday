import notfound from '../../assets/img/not-found/notfound.png';

export function NoResault() {
  return (
    <div className="no-reault flex column align-center justify-center">
      <img src={notfound} alt="no-resaults" />
      No results found in this board
    </div>
  );
}
