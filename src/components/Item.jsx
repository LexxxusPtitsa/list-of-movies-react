import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import GradeIcon from '@material-ui/icons/Grade';


export default function Item({ movie, setFilm, rated, changeRate, setChangeRate }) {

    const url = new URL('https://api.themoviedb.org/3/movie/' + movie.id + '/rating?api_key=4237669ebd35e8010beee2f55fd45546&guest_session_id=be3d4e4e44077433291314eae97676f7');
    const [rate, setRate] = useState(rated);
    useEffect(() => {
        setRate(rated);
    }, [rated])
    const handleChangeRate = (e) => {
        
        e.stopPropagation();
        e.preventDefault();
        const method = rate ? 'DELETE' : 'POST';
        fetch(url,
            {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({value: 10}),
            }
        )
            .then(res => res.json())
            .then(res => {
                setRate(movie.results ? res.success ? !rate : rate : rate);
                setChangeRate(!changeRate);
            })
            .catch(err => console.log(err))
    }
    console.log(rate);
    return (
        <div>
            <Link to={"/film:" + movie.id} onClick={() => setFilm(movie)} className="list__item">
                <div className="list__item-inner">
                    <img src={'https://image.tmdb.org/t/p/w130_and_h195_bestv2' + movie.poster_path} alt="" />
                    <GradeIcon onClick={(e) => {
                        handleChangeRate(e);
                    }} style={{ color: rate ? 'green' : 'red' }} />
                </div>
                <span>{movie.title}</span>
            </Link>
        </div>
    )
}
