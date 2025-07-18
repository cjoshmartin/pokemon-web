import styles from "./page.module.css";

import pokemon from "../../data";
import Link from "next/link";
import Image from "next/image";
import RandomPokemon from "@/compoents/randomPokemon";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

const PokemonCard = ({pokemon}: {pokemon: Pokemon}) => {
  return (
    <Link href={`/pokemon/${pokemon.id}`} className={styles.pokemon}>
      <h2>#{pokemon.id.toString().padStart(3, "0")} {pokemon.name}</h2>
      <Image src={pokemon.image} alt={pokemon.name} width={250} height={250} />
    </Link>
  );
};

export default function Home() {
  const pokemonList = pokemon.map((pokemon) => {
    return (
      <PokemonCard pokemon={pokemon} key={pokemon.id} />
    );
  });
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {pokemonList}
        <div className={styles.randomPokemon}>
          <RandomPokemon />
        </div>
      </main>
    </div>
  );
}
