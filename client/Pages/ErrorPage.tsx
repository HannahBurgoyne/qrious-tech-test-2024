import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <section className="p-20 flex flex-col justify-center items-center">
      <h1 className="font-heading text-2xl p-2 font-semibold">
        Oh no! That page cannot be found.
      </h1>
      <img
        src="./images/crying-squirtle.gif"
        alt="a gif of squirtle on his back crying"
      />
      <Link className="bg-fighting text-white rounded p-4 m-4" to={'/'}>
        Go home
      </Link>
    </section>
  )
}

export default ErrorPage
