import React from "react"
import { useHistory } from "react-router"

const SmallSingleSearchResult = ({ docOrhosp }) => {
    const history = useHistory()
    return (
        <div className="smallSingleSearchResult mt-2" onClick={() => history.push(`/profile/${docOrhosp._id}`)}>
            <div>
                <img
                    src={docOrhosp.image}
                    style={{
                        height: "35px",
                        width: "35px",
                        borderRadius: "50%",
                        objectFit: "cover",
                    }}
                />
            </div>
            <div className="d-flex justify-content-around align-items-center w-100">
                <h5>
                    {docOrhosp.name} {docOrhosp.surname && docOrhosp.surname}
                </h5>
                <p style={{ fontSize: "20px" }}>|</p>
                <h6>{docOrhosp.specialization[0]}</h6>
            </div>
        </div>
    )
}

export default SmallSingleSearchResult
