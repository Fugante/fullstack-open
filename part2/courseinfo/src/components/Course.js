const Header = ({ courseName }) => <h1>{courseName}</h1>
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>
const Content = ({ parts }) => (
  <>
    {
      parts.map(
        (part) => <Part key={part.id} name={part.name} exercises={part.exercises} />
      )
    }
  </>
)
const Exercises = ({ exNo }) => <b>total of {exNo} exercises </b>


const Course = ({ course }) => (
  <>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Exercises exNo={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
  </>
)

export default Course