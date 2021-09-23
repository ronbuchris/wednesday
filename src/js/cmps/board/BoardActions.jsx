import Filter from 'monday-ui-react-core/dist/icons/Filter';
import Person from 'monday-ui-react-core/dist/icons/Person';
import Sort from 'monday-ui-react-core/dist/icons/Sort';
export function BoardActions() {
  return (
    <div className="actions-container">
        <p>Filter:<Filter /></p>
        <p>Person:<Person /></p>
        <p>Sort:<Sort /></p>
    </div>
  );
}
