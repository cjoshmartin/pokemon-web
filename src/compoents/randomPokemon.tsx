"use client";
import { useRouter } from "next/navigation";    
import pokemon from "../../data";
import styles from "./randomPokemon.module.css";
import Image from "next/image";

export default function RandomPokemon() {
  const router = useRouter();

  const getRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * pokemon.length);
    const randomPokemon = pokemon[randomIndex];
    router.push(`/pokemon/${randomPokemon.id}`);
  };

  return (
    <button className={styles.button} onClick={getRandomPokemon}>
        <p>
            Get Random Pokemon
        </p>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/5/53/Poké_Ball_icon.svg" alt="pokeball" width={250} height={250} />
    </button>
  );
}