import React from "react"
import HomeSearch from "../components/HomeSearch"
import ReasonsToJoin from "../components/ReasonsToJoin"
import { useState } from "react"

const Home = () => {
    const [showResults, setShowResults] = useState(false)

    return (
        <div onClick={() => setShowResults(false)}>
            <HomeSearch showResults={showResults} setShowResults={setShowResults} />
            <ReasonsToJoin />
        </div>
    )
}

export default Home
