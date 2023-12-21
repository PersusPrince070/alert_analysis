import React, {useState, createContext} from "react";
import Header from "../common/Header";
import Body from "../common/Body";
import Footer from "../common/Footer";

export const ProductContext = createContext()

const Landing = () => {
    const [message, setMessage] = useState([])

    return (
        <ProductContext.Provider value={ { message, setMessage } }>
            <div className="landing-container">
                <Header />
                <Body />
                <Footer />
            </div>
        </ProductContext.Provider>
    )
}

export default Landing;