import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

function App() {
  const [pokemons, setPokemons] = useState<any>([]);
  const [loader, setLoader] = useState<any>(false);
  const [offset, setOffset] = useState(0);

  async function loadPokemon() {
    try {
      const data = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${10}&&offset=${offset}`
      );
      const response = await data.json();

      response.results.forEach((pokemon: any) => {
        setPokemons((old: any) => [...old, pokemon.name]);
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  useEffect(() => {
    loadPokemon();
  }, [offset]);

  async function handleScroll(e: any) {
    const top = e.target.documentElement.scrollTop;
    const bottom = e.target.documentElement.scrollHeight;
    const innerHeight = window.innerHeight;

    if (top + innerHeight + 1 >= bottom) {
      setLoader(true);
      setOffset((prevOffset) => (prevOffset += 10));
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "30px" }}>
          {pokemons.map((name: any, i: number) => (
            <div
              style={{
                height: "100px",
                border: "1px solid #ddd",
                width: "400px",
                textAlign: "center",
              }}
              key={i}
            >
              <span>{i + 1}.</span> <span>{name}</span>
            </div>
          ))}
        </div>
        {loader && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <InfinitySpin width="200" color="#4fa94d" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
