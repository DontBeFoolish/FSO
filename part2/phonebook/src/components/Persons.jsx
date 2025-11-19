
const Persons = ({ shownPersons, onClick }) => {

  return (
    <>
      {shownPersons.map(person =>
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

export default Persons