import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { useAppDispatch, useAppSelector } from "./hooks/storeHook";
import { getMovies } from "./features/movies/movieSlice";
import MovieCard from "./components/MovieCard/MovieCard";
import SearchBox from "./components/SearchBox/SearchBox";

function App() {

  const {darkTheme, movies} = useAppSelector(state => state);
  const [ searchTerm, setSearchTerm ] = useState('');
  const dispatch = useAppDispatch();
  useEffect(()=>{

   dispatch(getMovies());
  }, [dispatch]);

  const searchMovies = movies.data?.results.filter((movie) => {
    
    if(!searchTerm.length) {
    
    return movie;

    };

    if(!movie.title) return;

    

    return movie.title.toLowerCase().includes(searchTerm);

  });
  return (
    <div className={darkTheme ? "dark" : ""}>
      <div className="dark:bg-[#1a1a1a] dark:text-white min-h-screen px-4 lg:px-12 pb-20">
        <Header />
        <div className="mb-12 flex items-center justify-between">
          <SearchBox setSearchTerm={setSearchTerm} />
        </div>
        <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4    gap-4 ">
          {searchMovies &&
            searchMovies.map((movie) => {
              const { id, title, overview, poster_path } = movie;

              const imagePath = "https://image.tmdb.org/t/p/original";
              return (
                <MovieCard
                  key={id}
                  title={title}
                  overview={overview}
                  poster_path={` ${imagePath}` + poster_path}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
