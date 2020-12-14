import React, {useEffect} from 'react'
import LeftSidebarMenu from "./LeftSidebarMenu";
import { useHistory } from "react-router";

export default function Index(props) {
    const history = useHistory();
    function capitalizeFirstLetter(string) {
        return string.charAt(1).toUpperCase() + string.slice(2);
    };
    
    useEffect(() => {
        let currentage = capitalizeFirstLetter(history.location.pathname);
        document.title = currentage + " | Lets Chat";
    })

    return (
        <React.Fragment>
                <div className="layout-wrapper d-lg-flex">
                    <LeftSidebarMenu />
                    {props.children}
                </div>
            </React.Fragment>
    )
}
