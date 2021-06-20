import React from 'react'
import './Sidebar.css'
import SearchIcon from "@material-ui/icons/Search"
import { BorderColorOutlined } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'


const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__search">
                    <SearchIcon className="sidebar__searchicon" />
                    <input placeholder="Search" className="sidebar__input"></input>
                </div>
                <IconButton variant=" outlined" id="sidebar__button">
                <BorderColorOutlined />
                </IconButton>
            </div>
            <div className="sidebar__thread"></div>
            <div className="sidebar__bottom"></div>
        </div>
    )
}

export default Sidebar
