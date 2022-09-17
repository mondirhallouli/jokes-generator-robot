import { useEffect, useState } from 'react'
import './App.css'
import robot from './assets/robot.svg'

interface Joke {
	joke: string
}

interface ReqOptions {
	method: string | "GET",
	headers: {
		'X-RapidAPI-Key': string,
		'X-RapidAPI-Host': string,
	}
}

function App(): JSX.Element {
	let [joke, setJoke] = useState<Joke | null>(null);
	let [clicks, setClicks] = useState(0);

	const options: ReqOptions = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
			'X-RapidAPI-Host': 'geek-jokes.p.rapidapi.com'
		}
	};

	useEffect(() => {
		fetch('https://geek-jokes.p.rapidapi.com/api?format=json', options)
			.then(response => response.json())
			.then(data => {
				setJoke(data);
			})
			.catch(err => console.error(err));
	}, [clicks])

	return (
		<div className="App">
			<div className="bot-img">
				<img src={robot} alt="joke robot" />
			</div>
			<button className='joke-btn' onClick={() => setClicks((state) => clicks = state + 1)}>Tell me a joke</button>
			<div className="joke-box">
				{!joke && <p>Looking for a joke...</p>}
				{
					joke && joke.joke
				}
			</div>
		</div>
	)
}

export default App
