import React, { useEffect, useState } from "react"
import { FormControl, InputGroup, Row, Col } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { getDoctorsAndClinics } from "../api/usersApi"
import SmallSingleSearchResult from "./SmallSingleSearchResult"

const HomeSearch = ({ showResults, setShowResults }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [searchText, setSearchText] = useState("")
    const [doctorsAndHopsitals, setDoctorsAndHospitals] = useState([])

    const handleEnterKey = (e) => {
        if (e.keyCode === 13 || e.key === "Enter") {
            dispatch({ type: "SET_SEARCH_TEXT", payload: searchText })
            history.push("results")
        }

        console.log(e)

        getDoctorsHospitals(`${searchText}${e.key}`)
    }

    const getDoctorsHospitals = async (keyword) => {
        try {
            const query = `?name=${keyword}&specialization=${keyword}`

            const response = await getDoctorsAndClinics(query)

            if (response.statusText === "OK") {
                setDoctorsAndHospitals(response.data.slice(0, 5))
            }
        } catch (error) {
            return []
        }
    }

    useEffect(() => {
        getDoctorsHospitals(searchText)
    }, [])

    return (
        <Row>
            <Col sm="12" style={{ position: "relative" }} className="px-0">
                <img
                    src="https://sybridmd.com/wp-content/uploads/2019/12/Joros_PatientExp-824x320.jpg"
                    alt="doctor and patient"
                    className="w-100"
                    style={{ objectFit: "cover" }}
                />
                <div className="homePageSearch">
                    <p className="d-none d-md-block">
                        Easiest way to <br /> meet your doctor
                    </p>
                    <div style={{ position: "relative" }}>
                        <InputGroup className="mb-md-5">
                            <FormControl
                                placeholder="Search doctor by name or specialization"
                                aria-label="Search doctor by name or specialization"
                                aria-describedby="basic-addon2"
                                value={searchText}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setShowResults(true)
                                }}
                                onKeyDown={handleEnterKey}
                                onChange={(e) => setSearchText(e.currentTarget.value)}
                                className="py-4"
                            />
                            <InputGroup.Append>
                                <button
                                    className="orangeButton"
                                    style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                    onClick={() => {
                                        dispatch({ type: "SET_SEARCH_TEXT", payload: searchText })
                                        history.push("results")
                                    }}
                                >
                                    <i className="fas fa-search px-3"></i>
                                </button>
                            </InputGroup.Append>
                        </InputGroup>

                        {showResults ? (
                            <div className="homePageSearchResults shadow">
                                {doctorsAndHopsitals.map((docOrhosp, index) => (
                                    <SmallSingleSearchResult
                                        docOrhosp={docOrhosp}
                                        key={`${docOrhosp._id}index${index + 2132}`}
                                    />
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default HomeSearch
