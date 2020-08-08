import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Item from "./Item";

export default function List({ movies, pagination, setFilm, ratedMovies, changeRate, setChangeRate }) {
    const [films, setState] = useState();
    useEffect(() => {
        setState(movies.results);
    }, [movies])

    console.log(films);

    return (
        <>
            <div className="list">
                {
                    movies.results.map((movie, key) => (


                        <Item
                            key={key}
                            changeRate={changeRate} 
                            setChangeRate={setChangeRate}
                            setFilm={setFilm}
                            movie={movie}
                            rated={
                                ratedMovies ?

                                    ratedMovies.results.map((rmovie, index) => (
                                        rmovie.id === movie.id ? true : false
                                    )).indexOf(true) > -1 ? true : false
                                    : false
                            }
                        />


                    ))
                }
            </div>
            <div className="pagination">
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={movies.total_pages}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={(data) => pagination({ page: data.selected })}
                    containerClassName={'pagination__inner'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>

        </>
    )
}
