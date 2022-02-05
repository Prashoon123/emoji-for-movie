import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [movieInput, setMovieInput] = useState("");
  const [result, setResult] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie: movieInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setMovieInput("");
  }

  return (
    <div>
      <Head>
        <title>Emoji For Movie</title>
        <link rel="icon" href="/movie.jpg" />
      </Head>

      <main className={styles.main}>
        <img src="/movie.jpg" className={styles.icon} />
        <h3>Generate an emoji for your favorite movie</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="movie"
            placeholder="Enter a movie"
            value={movieInput}
            onChange={(e) => setMovieInput(e.target.value)}
          />
          <input type="submit" value="Generate emoji for movie" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
