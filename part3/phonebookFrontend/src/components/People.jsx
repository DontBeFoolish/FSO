
const People = ({ shownPeople, onClick }) => {

  return (
    <>
      {shownPeople.map(person =>
        <p key={person.id}>
          {person.name} - {person.number} - 
          <button onClick={() => onClick(person.id, person.name)}>
            delete
          </button>
        </p>
      )}
    </>
  )

}

export default People