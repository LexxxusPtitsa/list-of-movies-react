import React, { useState, useEffect } from 'react'

export default function RatedMovies({setFilm}) {
    const [state, setState] = useState([]);
    const films = state.results;
    const total_pages = state.total_pages;
    const url = new URL('https://api.themoviedb.org/3/guest_session/be3d4e4e44077433291314eae97676f7/rated/movies?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US&sort_by=created_at.asc');
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setState(res);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <div className="list">
                {
                    films.map((movie, key) => (
                        <Item key={key} setFilm={setFilm} movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}
