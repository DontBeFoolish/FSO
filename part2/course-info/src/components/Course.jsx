const Header = (props) => <h1>{props.course}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part =>
      <Part key={part.id} part={part}/>
    )}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => (
  <b>
    total exercises - {parts.reduce((sum, part) => {return sum += part.exercises},0)}
  </b>
)

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course