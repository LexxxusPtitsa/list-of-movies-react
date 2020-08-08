import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


export default function Header({ genreFilter, sortBy, setRatedList, ratedList }) {
    const classes = useStyles();
    const [genres, setGenres] = useState([]);
    const url = new URL('https://api.themoviedb.org/3/genre/movie/list?api_key=4237669ebd35e8010beee2f55fd45546&language=en-US');

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setGenres(res.genres);
            })
            .catch(err => console.log(err));
    }, [])

    const [genre, setGenre] = useState('');

    const handleChange = (event) => {
        genreFilter(event.target.value);
        setGenre(event.target.value);
    };

    const sortMovies = (by) => {
        sortBy(by);
    }
    return (
        <div className="header">
            <div className="rated">
                <Button onClick={() => setRatedList(!ratedList)} variant="contained" color={ratedList ? "primary" : "default"}>
                    Rated
                </Button>
            </div>
            {!ratedList ?
                <div className="filter">
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Genre</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={genre}
                            onChange={handleChange}
                            label="Genre"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                genres.map((genre, key) => (
                                    <MenuItem key={key} value={genre.id}>{genre.name}</MenuItem>
                                ))
                            }

                        </Select>
                    </FormControl>
                </div> :
                null
            }

            {!ratedList ?
                <div className="sort">
                    <div className="sort__title">
                        Sort by:
                </div>
                    <div className="sort__buttons">
                        <Button onClick={() => sortMovies('popularity.desc')} variant="contained" color="primary">
                            Popularity
                    </Button>
                        <Button onClick={() => sortMovies('vote_average.desc')} variant="contained" color="primary">
                            Rating
                    </Button>
                        <Button onClick={() => sortMovies('release_date.desc')} variant="contained" color="primary">
                            Release date
                    </Button>
                    </div>
                </div> :
                null
            }

        </div>
    )
}
