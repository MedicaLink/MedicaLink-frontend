import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Search, UiChecksGrid } from 'react-bootstrap-icons';
import './Searchbar.css';

interface BaseProps {
    children?: React.ReactNode,
    className?: string,
    value? : string,
    name? : string,
}

interface FilterCategoryProps extends BaseProps{
    checked? : boolean,
    checkedValue? : string,
    onChange? : (e : React.ChangeEvent<HTMLInputElement>) => void
}

export function FilterCategory({className, children, name,  value = '', checked, onChange}: FilterCategoryProps) {

    return (
        <li className="category">
            <input type="radio" 
            id={`radio-${name}-${value}`}
            name={name} value={value} 
            className={`radio ${className}`}
            defaultChecked={checked}
            onChange={onChange}/>

            <label htmlFor={`radio-${name}-${value}`}>{children}</label>
        </li>
    );
}

export function FilterList({ children }: BaseProps) {
    
    return (
        <ul>
            {children}
        </ul>
    );
}

export function FilterTitle({ children }: BaseProps) {
    return <h6>{children}</h6>;
}

export function FilterGroup({ children }: BaseProps) {

    return (
        <div className="col">
            {children}
        </div>
    );
}

export function SearchFilter({ children }: BaseProps) {

    return (
        <div className="container-fluid search-filter" id="search-filter">
            <div className="row py-3 pb-md-0">

                {children}

            </div>
        </div>
    );
}

interface SearchbarProps {
    className?: string,
    value? : string;
    children?: React.ReactElement
    onChange? : (e : React.ChangeEvent<HTMLInputElement>) => void;
    onSearch? : () => void;
}

function Searchbar({ className, children, value, onChange, onSearch }: SearchbarProps) {

    const [open, setOpen] = useState(false);
    useEffect(() => { if(onSearch) {
        console.log("Working In searchbar");
        onSearch();
    } }, [value])

    return (
        <div id="search-controls-section" className={`py-2 px-3 section-blur ${className}`}>

            <div className="search-controls d-flex align-items-center">
                <button className="fs-5" /* onClick={onSearch} */>
                    <Search color='black' size={18} />
                </button>

                <input type="text" className="search-bar" placeholder="Search for patients..." value={value} onChange={onChange}
                onKeyDown={(e) => {
                    if(e.key == 'Enter' && onSearch){
                        onSearch();
                    }
                }}/>
                <div className="vr mx-2"></div>
                <button className="fs-5" data-bs-toggle="collapse" aria-expanded="false" aria-controls="search-filter"
                    onClick={() => setOpen(!open)}>

                    <UiChecksGrid color='black' size={18} />
                </button>
            </div>

            <Collapse in={open}>
                <div>
                    {children}
                </div>
            </Collapse>
        </div>
    );
}

export default Searchbar;