import pokemon from "../../../../data";
import Image from "next/image";
import styles from "./pokemon.module.css";
import Link from "next/link";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  description: string;
  types: string[];
  height: number;
  weight: number;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    "special-attack": number;
    "special-defense": number;
    speed: number;
  };
}

const PokemonControl = ({pokemon, isPrevious}: {pokemon: Pokemon, isPrevious: boolean}) => {
    if (!pokemon) {
        return null;
    }

  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      className={`${styles.control}`}
      style={!isPrevious ? { width: "300px", flex: "initial" } : {}}
    >
      <p>{isPrevious ? "Previous Pokemon:" : "Next Pokemon:"}</p>
      <div>
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          width={100}
          height={100}
        />
        <p>
          <b>{pokemon.name}</b>
        </p>
      </div>
    </Link>
  );
};

type Params = Promise<{ slug: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const a_pokemon = pokemon.find((pokemon) => pokemon.id === parseInt(slug));
  return {
    title: `#${a_pokemon?.id.toString().padStart(3, "0")} ${a_pokemon?.name} - Pokemon`,
  };
}


export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const a_pokemon = pokemon.find((pokemon) => pokemon.id === parseInt(slug));

  if (!a_pokemon) {
    return <div>Pokemon not found</div>;
  }
 const fincCurrentIndex = pokemon.findIndex((pokemon) => pokemon.id === parseInt(slug));
  const previous_pokemon = pokemon[fincCurrentIndex - 1];
  const next_pokemon = pokemon[fincCurrentIndex + 1];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>(#{a_pokemon.id.toString().padStart(3, "0")}) {a_pokemon.name}</h1>
        <Image
          src={a_pokemon.image}
          alt={a_pokemon.name}
          width={100}
          height={100}
        />

        <p>{a_pokemon.description}</p>

        <div className={styles.stats}>
          <p>Types: {a_pokemon.types.join(", ")}</p>
          <p>Height: {a_pokemon.height}</p>
          <p>Weight: {a_pokemon.weight}</p>
          <p>HP: {a_pokemon.stats.hp}</p>
          <p>Attack: {a_pokemon.stats.attack}</p>
          <p>Defense: {a_pokemon.stats.defense}</p>
          <p>Special Attack: {a_pokemon.stats["special-attack"]}</p>
          <p>Special Defense: {a_pokemon.stats["special-defense"]}</p>
          <p>Speed: {a_pokemon.stats.speed}</p>
        </div>
        <div
          className={styles.controls}
          style={{ flexDirection: previous_pokemon ? "row" : "row-reverse" }}
        >
          <PokemonControl pokemon={previous_pokemon} isPrevious={true} />
          <PokemonControl pokemon={next_pokemon} isPrevious={false} />
        </div>
        <Link href="/" className={styles.control}> Back to Home</Link>
      </div>
    </main>
  );    
}