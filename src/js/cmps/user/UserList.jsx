

function UserList({users}){
        return (
            <div>
                {users.map(user => {
                    return <div>
                        {user.username}
                    </div>
                })}
            </div>
        );
}


