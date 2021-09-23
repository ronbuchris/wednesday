import Email from 'monday-ui-react-core/dist/icons/Email';
import Mobile from 'monday-ui-react-core/dist/icons/Mobile';
import Calendar from 'monday-ui-react-core/dist/icons/Calendar';

export function UserDetails({user}) {
    return (
        <div className="user-details">
            <header className="user-header">
            <img src={user.img} className="user-img"/>
            <h1>{user.fullname}</h1>
            </header>
            <div className="user-content">
                <h3>Overview</h3>
                <h4><Email />Email:</h4>
                <h4><Mobile />Phone:</h4>
                <h4><Calendar />Birthday:</h4>
            </div>
        </div>

    );
}