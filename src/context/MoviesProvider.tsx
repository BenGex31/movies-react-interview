import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Movie } from "../types";
import { movies$ } from "../movies/movies";

interface MoviesContextType {
  movies: Movie[];
  setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export function useMovies(): MoviesContextType {
  const context = useContext(MoviesContext);
  if (context) {
    return context;
  } else {
    throw new Error("useMovies must be used within a MoviesProvider");
  }
}

type MoviesProviderType = {
  children: ReactNode;
};

export default function MoviesProvider({ children }: MoviesProviderType) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    movies$.then((movies) => setMovies(movies));
  }, []);

  return (
    <MoviesContext.Provider value={{ movies, setMovies }}>
      {children}
    </MoviesContext.Provider>
  );
}
