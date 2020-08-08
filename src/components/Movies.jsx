import React, { useState, useEffect } from 'react';
import List from "./List";
import Header from "./Header";



export default function Movies({ setFilm }) {
    const [movies, setMovies] = useState();
    const [ratedMovies, setRatedMovies] = useState();
    const [loader, setLoader] = useState({ isLoaded: false });
    const [ratedList, setRatedList] = useState(false);
    const url = new URL('https://api.themoviedb.org/3/discover/movie?');
    const ratedUrl = new URL('https://api.themoviedb.org/3/guest_session/be3d4e4e44077433291314eae97676f7/rated/movies?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US&sort_by=created_at.asc');
    const [changeRate, setChangeRate] = useState(false);


    const [params, setParams] = useState({
        api_key: '4237669ebd35e8010beee2f55fd45546',
        language: 'en-US',
        page: 1
    });
    let newUrl = url;
    const pagination = ({ page }) => {
        setParams({ ...params, page: page + 1 });
    };
    const genreFilter = (id) => {
        setParams({ ...params, with_genres: id });
    };
    const sortBy = (sort) => {
        setParams({ ...params, sort_by: sort });
    };

    useEffect(() => {
        Object.keys(params).forEach(key => newUrl.searchParams.append(key, params[key]));
        fetch(newUrl)
            .then(res => res.json())
            .then(res => {
                setMovies(res);
                setLoader({ isLoaded: true });
            })
            .catch(err => console.log(err));
   
        fetch(ratedUrl)
            .then(res => res.json())
            .then(res => {
                setRatedMovies(res);
            })
            .catch(err => console.log(err));
    }, [params, ratedList, changeRate]);

    return (
        <div>
            <Header genreFilter={genreFilter} sortBy={sortBy} ratedList={ratedList} setRatedList={setRatedList} />
            {loader.isLoaded ?
                movies && movies.results.length > 0 ?
                    <List movies={ratedList ? ratedMovies : movies} setFilm={setFilm} ratedMovies={ratedMovies} pagination={pagination} changeRate={changeRate} setChangeRate={setChangeRate} /> :
                    <span>No movies</span> :
                <span>Loading...</span>
            }
        </div>
    )
}
