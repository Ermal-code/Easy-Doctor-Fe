import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import PatientAppointments from "./PatientAppointments";
import PatientDocuments from "./PatientDocuments";
import PatientInfo from "./PatientInfo";
import PatientSidebar from "./PatientSidebar";

const ProfilePatient = ({ profile }) => {
  const [selectedSection, setSelectedSection] = useState(1);
  return (
    <div className="mb-5" style={{ minHeight: "80vh" }}>
      <Row>
        <PatientSidebar
          profile={profile}
          setSelectedSection={setSelectedSection}
          selectedSection={selectedSection}
        />
        <Col md={9} className="ml-0 shadow patientContent">
          {selectedSection === 1 && <PatientInfo profile={profile} />}
          {selectedSection === 2 && <PatientAppointments />}
          {selectedSection === 3 && (
            <PatientDocuments profileId={profile._id} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePatient;
