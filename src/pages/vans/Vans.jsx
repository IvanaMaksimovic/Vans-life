import React from 'react';
import {Link, useSearchParams, useLoaderData} from "react-router-dom";
import { getVans } from '../../api';

export function loader() {
    return getVans();
}

export default function Vans() {

// const [vans, setVans] = React.useState([]);
// const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState(null);
const vans= useLoaderData();

const [searchParams, setSearchParams] = useSearchParams();
const typeFilter = searchParams.get("type");

// React.useEffect(() => {
//     async function loadVans() {
//         setLoading(true);
//         try {
//               const data = await getVans();
//               setVans(data);
//         }
//         catch(err) {
//             setError(err)
//         }
//         finally{     
//             setLoading(false);
//         }
//     }
//     loadVans()
// }
// , []);


const displayedVans = typeFilter ? vans.filter(van => van.type === typeFilter) : vans;

const vanElements = displayedVans.map(van => (
   <div key={van.id} className="van-tile">
       <Link to={van.id} 
       state = {{search: `?${searchParams.toString()}`, type: typeFilter}} >
        <img src={van.imageUrl}/>
        <div className="van-info">
            <h3>{van.name}</h3>
            <p>&{van.price}<span>/day</span></p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
       </Link>
    </div>
));

// if(loading) {
//     return <h1>The page is loading...</h1>
// }

if(error) {
    <h1>There was an error: {error.message}</h1>
}

// Trying an errorElement:
// throw new Error("Undefined is not a function");

  return (
    <div className="van-list-container">
        <h1>Explore our van options</h1>

        <div className='van-list-filter-buttons'>
            <button className={`van-type simple ${typeFilter === "simple" ? "selected" : null}`} onClick={() => setSearchParams({type: "simple"})}>Simple</button>
            <button className={`van-type luxury ${typeFilter === "luxury" ? "selected" : null}`} onClick={() => setSearchParams({type: "luxury"})}>Luxury</button>
            <button className={`van-type rugged ${typeFilter === "rugged" ? "selected" : null}`} onClick={() => setSearchParams({type: "rugged"})}>Rugged</button>
            {typeFilter && <button className="van-type clear-filters" onClick={() => setSearchParams({})}>Clear filters</button>}
        </div>

        <div className='van-list'>
            {vanElements}
        </div>
    </div>
  )
};