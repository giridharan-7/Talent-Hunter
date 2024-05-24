import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import axios from "axios";

const Tables = ({
  extractedSkills,
  linkedSkills,
  setLinkedSkills,
  handleInputChangeForResumeParser,
  handleRemoveListOfSkillParse,
  experience,
  handleInputChangeForExperience,
  handleRemoveExperience,
  education,
  handleInputChangeForEducation,
  handleRemoveEducation,
  options,
}) => {
  const [skillStatus, setSkillStatus] = useState({});
  const [expandedRow, setExpandedRow] = useState(-1);
  useEffect(() => {
    // Fetch skill status for all extracted skills when the component mounts
    const fetchSkillStatus = async () => {
      const statusMap = {};
      for (const skill of extractedSkills) {
        const status = await getskillstatus(skill.skill);
        console.log(status);
        statusMap[skill.skill] = status;
      }
      setSkillStatus(statusMap);
    };

    fetchSkillStatus();
  }, [extractedSkills]);

  async function getskillstatus(skill) {
    try {
      const response = await axios.get(`http://localhost:3001/checkskill/${skill}`);
      console.log("hi"+response.data);
      return response.data.skillExists;
    } catch (error) {
      console.error('Error checking skill in database:', error.message);
      return false; // Handle errors gracefully, assuming skill doesn't exist
    }
  }
 console.log(skillStatus);
  const toggleDescription = (index) => {
    setExpandedRow((prev) => {
      if (prev === index) return -1;
      return index;
    });
  };

  console.log(extractedSkills);

  const handleLinkedSkillsChange = (e, i) => {
    setLinkedSkills((prev) => {
      let obj = prev[i];
      prev[i] = { ...obj, [e.target.name]: e.target.value };

      return [...prev];
    });
  };

  return (
    <div>
      <table className="table table-sm px-5 mt-3 caption-top">
        <caption className="mx-1 fs-5">
          <b>Skills</b>
        </caption>
        <thead>
          <tr>
            <th>Skills</th>
            <th>Status</th>
            <th>Experience</th>
            <th className="text-center ">Validation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {extractedSkills.map((skill, index) => (
            <tr key={index}>
              <td>{skill.skill}</td>
              <td>{skillStatus[skill.skill]?"Found":"Not Found"}</td>  
              <td>
                <input
                  type="text"
                  name="experience"
                  className="form-control"
                  style={{
                    height: "24px",
                    width: "70px",
                  }}
                  value={skill.experience}
                  onChange={(e) => handleInputChangeForResumeParser(e, index)}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  name="validated"
                  checked={skill.validated}
                  onChange={(e) => handleInputChangeForResumeParser(e, index)}
                />
              </td>
              {/* <td className="text-center ">
                <input
                  type="checkbox"
                  name="required"
                  checked={skill.required}
                  onChange={(e) => handleInputChangeForResumeParser(e, index)}
                />
              </td> */}

              <td onClick={() => handleRemoveListOfSkillParse(index)}>
                <MdDelete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="table table-sm px-5 mt-3 caption-top">
        <caption className="mx-1 fs-5">
          <b>Experience</b>
        </caption>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Employer</th>
            <th className="text-center">From</th>
            <th className="text-center">To</th>
            <th className="text-center">Current</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience?.length > 0 &&
            experience?.map((exp, i) => (
              <React.Fragment key={i}>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="jobTitle"
                      className="form-control"
                      style={{
                        fontSize: "14px",
                        height: "24px",
                      }}
                      value={exp?.jobTitle}
                      onChange={(e) => handleInputChangeForExperience(e, i)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="employer"
                      className="form-control"
                      style={{
                        fontSize: "14px",
                        height: "24px",
                      }}
                      value={exp?.employer}
                      onChange={(e) => handleInputChangeForExperience(e, i)}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="date"
                      name="startDate"
                      className="form-control"
                      style={{
                        fontSize: "14px",
                        height: "24px",
                      }}
                      value={exp?.startDate}
                      onChange={(e) => handleInputChangeForExperience(e, i)}
                    />
                  </td>
                  <td className="text-center">
                    {!exp?.isCurrent ? (
                      <input
                        type="date"
                        name="endDate"
                        className="form-control"
                        style={{
                          fontSize: "14px",
                          height: "24px",
                        }}
                        value={exp?.endDate}
                        onChange={(e) => handleInputChangeForExperience(e, i)}
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="text-center py-2">
                    <input
                      type="checkbox"
                      name="validated"
                      checked={exp?.isCurrent}
                      onChange={(e) => handleInputChangeForExperience(e, i)}
                    />
                  </td>
                  <td>
                    <MdDelete
                      className="cursor-pointer"
                      onClick={() => handleRemoveExperience(i)}
                    />
                    <CiMenuKebab
                      className="ms-1 cursor-pointer"
                      onClick={() => toggleDescription(i)}
                    />
                  </td>
                </tr>
                <tr
                  style={{ display: expandedRow === i ? "table-row" : "none" }}
                >
                  <td colSpan="6">
                    <div
                      className="pb-3"
                      dangerouslySetInnerHTML={{ __html: exp?.remark }}
                    ></div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>

      <table className="table table-sm px-5 mt-3 caption-top">
        <caption className="mx-1 fs-5">
          <b>Education</b>
        </caption>
        <thead>
          <tr>
            <th>Education</th>
            <th>Institute</th>
            <th className="text-center">Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {education?.length > 0 &&
            education?.map((edu, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="text"
                    name="degree"
                    className="form-control"
                    style={{
                      fontSize: "14px",
                      height: "24px",
                    }}
                    value={edu?.degree}
                    onChange={(e) => handleInputChangeForEducation(e, i)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="instituteName"
                    className="form-control"
                    style={{
                      fontSize: "14px",
                      height: "24px",
                    }}
                    value={edu?.instituteName}
                    onChange={(e) => handleInputChangeForEducation(e, i)}
                  />
                </td>
                <td className="text-center">
                  <input
                    type="date"
                    name="completedOn"
                    className="form-control"
                    style={{
                      fontSize: "14px",
                      height: "24px",
                    }}
                    value={edu?.completedOn}
                    onChange={(e) => handleInputChangeForEducation(e, i)}
                  />
                </td>
                <td onClick={() => handleRemoveEducation(i)}>
                  <MdDelete />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <table className="table table-sm px-5 mt-3 caption-top">
        <caption className="mx-1 fs-5">
          <b>Skills</b>
        </caption>
        <thead>
          <tr>
            <th>Skills</th>
            <th>Used</th>
            <th>Acquired</th>
          </tr>
        </thead>
        <tbody>
          {linkedSkills.map((skill, index) => (
            <tr key={index}>
              <td>{skill.skill}</td>
              <td>
                <select
                  name="used"
                  className="form-control p-0 px-1 fs-6"
                  style={{
                    height: "24px",
                  }}
                  value={skill.used}
                  onChange={(e) => handleLinkedSkillsChange(e, index)}
                >
                  <option value=""></option>
                  {options?.map((e, i) => (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  name="acquired"
                  className="form-control p-0 px-1 fs-6"
                  style={{
                    height: "24px",
                  }}
                  value={skill.acquired}
                  onChange={(e) => handleLinkedSkillsChange(e, index)}
                >
                  <option value=""></option>
                  {options?.map((e, i) => (
                    <option value={e} key={i}>
                      {e}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;


