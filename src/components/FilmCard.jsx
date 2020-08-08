import React, { useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function FilmCard(props) {
    const classes = useStyles();
    const movie = props.film;
    console.log(movie);
    return (
        <div className="film" >
            {!movie ?
                <Redirect to="/" /> :
                <>  
                    <div className="film__back">
                    <Link to="/">
                        <Button variant="outlined" color="primary">
                            {'<'} Home
                        </Button>
                    </Link>
                    </div>
                    
                    <div className="film__wrapper">
                        <div className="film__inner">
                            <img src={'https://image.tmdb.org/t/p/w130_and_h195_bestv2' + movie.poster_path} alt="" />
                            <div className="film__info">
                                <h1 className="film__title">{movie.original_title}</h1>
                                <div className="film__props">
                                    <span>Popularity : {movie.popularity}</span>
                                    <span>Votes : {movie.vote_count}</span>
                                    <span>Rating : {movie.vote_average}</span>
                                    <span>Release date : {movie.release_date}</span>
                                </div>
                            </div>

                            <div className="film__overview">
                                <h2>Overview</h2>
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
