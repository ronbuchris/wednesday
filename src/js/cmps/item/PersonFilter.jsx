

export function PersonFilter({ board, onFilterPerson, persons }) {
    const getPersons = () => {
        const persons = []
        board.groups.map(group => {
            group.items.map((item) => {
                const columnIdx = item.columns.findIndex(column => column.type === 'member')
                item.columns[columnIdx].members.map(member => {
                    persons.push(member)
                })
            })
        })
        const personsToReturn = persons.filter((person, index, self) =>
            index === self.findIndex((member) => (
                member._id === person._id
            ))
        )
        return personsToReturn
    }
    const isFilter = (personId) => {
        return persons.includes(personId);
    };

    return (
        <div className="column-option">
            <div className="title">Persons</div>
            <div className="options-container flex column">
                {getPersons().map((person) => {
                    return <div
                        key={person._id}
                        className={`flex filter-item align-center br4 header-btn space-between
                         ${isFilter(person._id) ? 'filter' : ''}`}
                        onClick={() => {
                            onFilterPerson(person._id)
                        }}
                    >
                        <div className='flex auto-center'>
                            <img src={person.img} alt="" style={{width:25+'px', borderRadius: 50+'%', marginRight:5 +'px'}}/>
                            {person.fullname}
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}
