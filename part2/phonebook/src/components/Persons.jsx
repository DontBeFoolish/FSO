
const Persons = ({ shownPersons }) => {

  return (
    <>
      {shownPersons.map(person => <p key={person.id}>{person.name} - {person.number}</p>)}
    </>
  )

}

export default Persons