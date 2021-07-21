
import "./header.css";

import owlLogo from "../../assets/img/logo-owlfinity.svg"

const Header = () => {
    return (
        <div className="header">
            <div className="header_logo">
                <img src={owlLogo} alt="owlLogo" />
            </div>
        </div>
    )
}


export default Header