import React, { useEffect, useRef, useState } from "react";
import NavbarA from "../components/NavbarA";
import RightSideBar from "../components/RightSideBar";
import skillsData from "../skills.json";
import UserCardA from "../components/UserCardA";
import { LiaFileExportSolid } from "react-icons/lia";
import user from "../images/user.jpeg";
import placeholderImage from "../images/avatar-placeholder.webp";
import Footer from "../components/Footer";
import { BiSolidOffer } from "react-icons/bi";
import { MdDelete, MdEdit, MdVerifiedUser } from "react-icons/md";
import { ImSortAlphaDesc } from "react-icons/im";
import { IoMdAnalytics, IoMdArrowDropdown } from "react-icons/io";
import { GiArtificialIntelligence } from "react-icons/gi";
import PremiumService from "../components/PremiumService";
import { pdfjs } from "react-pdf";
import extractTextFromPDF from "../components/extractTextFromPDF";
import FileuploadJd from "../components/FileuploadJd";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";

import Tables from "../components/profile/Tables";

import { Base64 } from "../utils/resume-parser/base64";

// to read pdf content using react-pdf for parse JD
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const JdBasedSearch = () => {
  const active = {
    backgroundColor: "#EFF5DC",
    borderStyle: "solid",
    borderColor: "#815F0B",
    color: "#815F0B",
  };
  const Inactive = {
    backgroundColor: "white",
    borderStyle: "solid",
    color: "#815F0B",
    borderColor: "#815F0B",
  };

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const skills = skillsData.skills; // Access the skills from the imported JSON data
  const [isFocused, setIsFocused] = useState(false);
  const [exportOptions, setExportOptions] = useState(false);
  const [checkSkillEntered, setCheckSkillEntered] = useState(false);
  const [selectedValue, setSelectedValue] = useState("0"); // '0' is the default value
  const [isChecked, setIsChecked] = useState(false); // 'false' is the default value
  const [isCheckedValidation, setIsCheckedValidation] = useState(false); // 'false' is the default value
  const [view, setView] = useState("list");



  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Display suggestions only when there are at least 2 characters
    if (value.length >= 2) {
      // Filter skills based on the input value
      const filteredSkills = skills.filter((skill) =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSkills);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    setCheckSkillEntered(true);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const navbarRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("100vh");

  useEffect(() => {
    if (navbarRef.current) {
      const navbarHeight = navbarRef.current.offsetHeight;
      setContentHeight(`calc(98vh - ${navbarHeight}px)`);
    }
  }, []);

  const [listOfSkills, setListOfSkills] = useState([]);
 
  const handleAddAnotherSkill = async () => {
    // setListOfSkills([...listOfSkills, { skill: inputValue, experience: selectedValue, required: isChecked, validated: isCheckedValidation, edit: false }])
   

    setExtractedSkills([
      ...extractedSkills,
      {
        skill: inputValue,
        experience: selectedValue,
        required: isChecked,
        validated: isCheckedValidation,
        edit: false,
        addToList: false,
      },
    ]);
    console.log(listOfSkills);
    console.log("hI this is extracted skill");
    console.log(extractedSkills);
    setInputValue("");
    setSuggestions([]);
    setCheckSkillEntered(false);
  };

  const handleCloseModel = () => {
    setInputValue("");
    setSuggestions([]);
    setCheckSkillEntered(false);
  };

  const handleRemoveListOfSkill = (id) => {
    console.log(id);
    // remove from list of skills
    const updatedList = listOfSkills.filter(
      (skill, index) => index !== parseInt(id)
    );
    setListOfSkills(updatedList);
  };

  const handleSuggestion = () => {
    if (suggestions.length === 0) {
      setSuggestions([
        "react",
        "javascript",
        "spring boot",
        "bootstrap",
        "Next js",
        "tailwind css",
      ]);
    } else if (suggestions.length > 0) {
      setSuggestions([]);
    }
  };

  const [selected, setselected] = useState("");
  const [fileupload, setFileupload] = useState(false);
  const [files, setFiles] = useState([]);

  const [loading, setloading] = useState(false);
  const [resumeData, setResumeData] = useState({
    firstName: "",
    lastName: "",
    contactNo: "",
    email: "",
    linkedIn: "",
    github: "",
  });
  const [extractedSkills, setExtractedSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [options, setOptions] = useState([]);
  const [linkedSkills, setLinkedSkills] = useState([]);

  const [closeSaveJD, setCloseSaveJD] = useState(false);

  const extractSkillsFromText = (text) => {
    const skills = [];
    const skillKeywords = [
      "JavaScript",
      "React",
      "Node.js",
      "HTML",
      "CSS",
      "java",
      "spring boot",
    ];

    skillKeywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "i");
      if (regex.test(text)) {
        skills.push({
          skill: keyword,
          experience: "0",
          required: false,
          validated: false,
          addToList: false,
          edit: false,
        });
      }
    });

    return skills;
  };

  const uploadFile = async () => {
    // const textContent = await extractTextFromPDF(files[0].preview);
    // console.log(textContent);
    // const fileSkills = extractSkillsFromText(textContent);
    // console.log(fileSkills);
    // setExtractedSkills(fileSkills);
    // setFileupload(false);

    try {
      setloading(true);
      const resume = files[0];
      if (!resume) return alert("Please select a file.");

      const modifiedDate = new Date(resume.lastModified)
        .toISOString()
        .substring(0, 10);

      const body = await new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = function (event) {
          const base64Text = Base64.encodeArray(event.target.result);
          const data = {
            DocumentAsBase64String: base64Text,
            DocumentLastModified: modifiedDate,
            ConfigString: "OutputFormat.NormalizeRegions = true",
            SkillsSettings: {
              Normalize: true,
              TaxonomyVersion: "V2",
            },
          };
          resolve(data);
        };

        reader.readAsArrayBuffer(resume);
      });

      const response = axios.post(
        "https://rest.resumeparsing.com/v10/parser/resume",
        JSON.stringify(body),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Sovren-AccountId": "39862522",
            "Sovren-ServiceKey": "MPHs8q9cL+MrYdBP0a6JOOGv7a3h6vogInGVKG6f",
          },
        }
      );

      const { data } = await response;

      const resumeSkills =
        await data?.Value?.ResumeData?.Skills?.Normalized?.map((e) => ({
          skill: e.Name,
          experience: "0",
          required: false,
          validated: false,
          addToList: false,
          edit: false,
        }));

      const contactInfo = data?.Value?.ResumeData?.ContactInformation;
      const linkedIn = contactInfo?.WebAddresses?.reduce(
        (prev, curr) => (curr?.Type === "LinkedIn" ? curr?.Address : prev),
        ""
      );
      const github = contactInfo?.WebAddresses?.reduce(
        (prev, curr) => (curr?.Type === "GitHub" ? curr?.Address : prev),
        ""
      );
      const education =
        data?.Value?.ResumeData?.Education?.EducationDetails?.map((edu) => ({
          instituteName: edu?.SchoolName?.Raw,
          degree: edu?.Degree?.Name?.Raw,
          completedOn: edu?.LastEducationDate?.Date,
        })) || [];
      const experience =
        data?.Value?.ResumeData?.EmploymentHistory?.Positions?.map(
          (position) => ({
            employer: position?.Employer?.Name?.Raw,
            isCurrent: position?.IsCurrent,
            jobTitle: position?.JobTitle?.Raw,
            startDate: position?.StartDate?.Date,
            endDate: position?.EndDate?.Date,
            remark: position?.Description,
          })
        ) || [];

      setResumeData({
        firstName: contactInfo?.CandidateName?.GivenName || "",
        lastName: contactInfo?.CandidateName?.FamilyName || "",
        contactNo:
          contactInfo?.Telephones && contactInfo?.Telephones[0]
            ? contactInfo.Telephones[0]?.Normalized
            : "",
        email:
          contactInfo?.EmailAddresses && contactInfo?.EmailAddresses[0]
            ? contactInfo.EmailAddresses[0]
            : "",
        linkedIn,
        github,
        education,
        experience,
      });
      setEducation([...education]);
      setExperience([...experience]);
      setExtractedSkills([...resumeSkills]);
      setLinkedSkills([
        ...resumeSkills.map((e) => ({
          skill: e.skill,
          used: "",
          acquired: "",
        })),
      ]);
      setOptions([
        ...education.map((e) => e.degree),
        ...experience.map((e) => e.jobTitle),
      ]);
      setFileupload(false);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  const handleInputChangeForResumeParser = (event, index) => {
    const { name, value, type, checked ,status} = event.target;

    setExtractedSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      const skill = updatedSkills[index];

  // Update the Status based on whether the skill is found or not


  // Update the Status state
    
      if (type === "checkbox") {
        if (name === "required") {
          skill["addToList"] = checked;
        }
        skill[name] = checked;
      } else {
        skill[name] = value;
      }
      return updatedSkills;
    });
  };

  const handleInputChangeForExperience = (event, index) => {
    const { name, value, type, checked } = event.target;

    setExperience((prev) => {
      let obj = prev[index];
      if (type === "checkbox") {
        prev[index] = { ...obj, isCurrent: checked };
      } else {
        prev[index] = { ...obj, [name]: value };
      }
      return [...prev];
    });
  };

  const handleInputChangeForEducation = (event, index) => {
    const { name, value, type, checked } = event.target;

    setEducation((prev) => {
      let obj = prev[index];
      if (type === "checkbox") {
        prev[index] = { ...obj, isCurrent: checked };
      } else {
        prev[index] = { ...obj, [name]: value };
      }
      return [...prev];
    });
  };

  const handleRemoveListOfSkillParse = (id) => {
    console.log(id);
    // remove from list of skills
    const updatedList = extractedSkills.filter(
      (skill, index) => index !== parseInt(id)
    );
    setExtractedSkills(updatedList);

    setLinkedSkills((prev) => [...prev.filter((_, i) => i !== id)]);
  };

  const handleRemoveEducation = (id) => {
    setEducation((prev) => prev.filter((_, i) => i !== id));
  };

  const handleRemoveExperience = (id) => {
    setExperience((prev) => prev.filter((_, i) => i !== id));
  };

  const handleAccordion1 = (event) => {
    event.stopPropagation();
    const target = document.getElementById("panelsStayOpen-collapseOne");
    if (target.classList.contains("show")) {
      target.classList.remove("show");
    } else {
      target.classList.add("show");
    }
  };

  const handleAccordion2 = (event) => {
    event.stopPropagation();
    const target = document.getElementById("panelsStayOpen-collapseTwo");
    if (target.classList.contains("show")) {
      target.classList.remove("show");
    } else {
      target.classList.add("show");
    }
  };

  // temporary
  const [showSearch, setShowSearch] = useState(false);
  const [editJd, setEditJd] = useState(false);

  return (
    <>
      <div className="d-print-none">
        {/* modal */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  Job Description
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  onClick={handleCloseModel}
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div>
                  {/* <div className=' pill-bg-color text-white p-1 px-2  rounded-pill   '>{jobTitle}</div> */}

                  {listOfSkills.length > 0 && (
                    <div>
                      <table className="table-sm table">
                        <thead>
                          <tr>
                            <th>Skill</th>
                            <th>Status</th>
                            <th>Experience</th>
                            <th>Mandatory</th>
                            <th>Validated?</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listOfSkills.map((skill, index) => (
                            <tr key={index}>
                              <td>{skill.skill}</td>
                              <td>{skill.status}</td>
                              <td>{skill.experience}</td>
                              <td>{skill.required === true ? "Yes" : "No"} </td>
                              <td>
                                {skill.validated === true ? "Yes" : "No"}{" "}
                              </td>
                              <td
                                onClick={handleRemoveListOfSkill}
                                id={index}
                                className="btn-close"
                              ></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="mt-2 ">
                    <div className="d-flex justify-content-between px-1 align-items-center   ">
                      <label for="exampleFormControlInput1" class="form-label">
                        Skill <span className="text-danger">*</span>
                      </label>
                      {suggestions.length === 0 &&
                        isFocused &&
                        inputValue.length >= 2 &&
                        !skills.includes(inputValue) && (
                          <i style={{ color: "#815F0B" }} className="font-6">
                            Nothing found
                          </i>
                        )}
                      {suggestions.length === 0 &&
                        isFocused &&
                        inputValue.length <= 2 && (
                          <i style={{ color: "#815F0B" }} className="font-6">
                            Enter at least 2 characters
                          </i>
                        )}
                    </div>
                    <div className="input-group">
                      <input
                        type="text"
                        class="form-control bg-body-secondary "
                        id="exampleFormControlInput1"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder=""
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                      <button
                        className="btn border  "
                        onClick={handleSuggestion}
                      >
                        <IoMdArrowDropdown />
                      </button>
                    </div>
                    {suggestions.length > 0 && (
                      <div
                        className=" table-responsive d-flex  font-5  bg-white border w-auto   "
                        style={{
                          maxHeight: "170px",
                          position: "absolute",
                          zIndex: 999,
                        }}
                      >
                        <table className="table table-sm d-flex table-hover table-borderless  ">
                          <tbody className="font-5 w-100 ">
                            {suggestions.map((suggestion, index) => (
                              <tr
                                key={index}
                                onClick={() =>
                                  handleSuggestionClick(suggestion)
                                }
                              >
                                <td className=" ">{suggestion}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {checkSkillEntered && (
                    <div>
                      <div class="my-2   px-1  ">
                        <div className="d-flex align-items-center">
                          <div>
                            <label htmlFor="" className="pe-2">
                              Experience
                            </label>
                          </div>
                          <div>
                            <select
                              className="border-0 px-1"
                              style={{ color: "#815F0B" }}
                              aria-label="Default select example"
                              value={selectedValue}
                              onChange={(e) => setSelectedValue(e.target.value)}
                            >
                              <option value="No Experience">
                                No Experience
                              </option>
                              <option value="less than a year">
                                Less than a year
                              </option>
                              <option value="1 - 3 years">1 - 3 years</option>
                              <option value="More than 3 years">
                                More than 3 years
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-check form-switch">
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheckChecked"
                        >
                          Mandatory Skill
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          checked={isChecked}
                          onChange={() => setIsChecked(!isChecked)}
                        />
                      </div>
                      <div className="form-check form-switch">
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheckChecked1"
                        >
                          Validation
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked1"
                          checked={isCheckedValidation}
                          onChange={() =>
                            setIsCheckedValidation(!isCheckedValidation)
                          }
                        />
                      </div>

                      <div className="mt-2 d-flex  ">
                        <button
                          type="button"
                          className="btn  me-2 font-5 primary-green"
                          style={{
                            backgroundColor: "#F7FFDD",
                            color: "#815F0B",
                          }}
                          onClick={handleAddAnotherSkill}
                        >
                          Add another Skill
                        </button>
                        {/* {listOfSkills.length === 0 && */}
                        <div>
                          <button
                            type="button"
                            className="btn  me-2 font-5 primary-green"
                            style={{
                              backgroundColor: "#F7FFDD",
                              color: "#815F0B",
                            }}
                            data-bs-dismiss="modal"
                            onClick={handleAddAnotherSkill}
                          >
                            Save
                          </button>
                          {/* <button type="button" className="btn text-white font-5" style={{ backgroundColor: "#815F0B" }} >Search</button> */}
                        </div>
                        {/* } */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div class="modal-footer"></div>
            </div>
          </div>
        </div>

        {/* second modal for save JD name */}
        {closeSaveJD && (
          <div class="modal show d-block " tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Save Job Description</h5>
                  <button
                    type="button"
                    class="btn-close"
                    onClick={() => setCloseSaveJD(false)}
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">
                      Enter a name to save JD
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                    />
                  </div>

                  <button
                    type="button"
                    className="btn text-white font-5"
                    style={{ backgroundColor: "#815F0B" }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={navbarRef} id="yourNavbarId">
          <NavbarA />
          <hr className="p-0 m-0 " />
        </div>

        <div
          styl={{ backgroundColor: "#", minHeight: "", height: "" }}
          className="container-fluid  h6 "
        >
          <div className=" row  gap-0  ">
            <div className=" bg-white px-1 col-lg-3 col-sm-12  font-5 fixed-sidebar   rounded ">
              <div
                className="mt-2 px-2 mb-2   rounded-top primary-green  d-flex align-items-center justify-content-between  "
                style={{ backgroundColor: "", height: "" }}
              >
                <div
                  className="text h6 text-center mt-2   "
                  style={{ padding: " ", color: "#815F0B", cursor: "pointer" }}
                >
                  Opportunity Profiles
                </div>
                <div
                  className="d-flex align-items-center justify-content-center font-2 "
                  style={{ cursor: "pointer", color: "#815F0B" }}
                  onClick={() => setFileupload(true)}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Add New JD"
                >
                  <AiOutlinePlusCircle />
                </div>
              </div>

              <div
                className=" table-responsive   font-5 "
                style={{ height: "130px" }}
              >
                <>
                  <table className="table-sm table  ">
                    <thead>
                      <tr>
                        <th>JD Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className=" "
                        onClick={() =>
                          setExtractedSkills([
                            {
                              skill: "React",
                              experience: "1",
                              required: true,
                              validated: true,
                              edit: false,
                            },
                            {
                              skill: "Javascript",
                              experience: "0",
                              required: false,
                              validated: false,
                              edit: false,
                            },
                          ])
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <td>React Developer</td>
                        <td>
                          <span class="badge text-bg-warning">Pending</span>
                        </td>
                        <td className="d-flex align-items-center h-100  ">
                          <button
                            className=" btn-sm  px-1 py-1  m-0   border-0 bg-white   "
                            style={{}}
                            onClick={() => setEditJd(!editJd)}
                          >
                            <MdEdit />
                          </button>
                          <button
                            className=" btn-sm  px-1 py-1  m-0   border-0 bg-white   "
                            style={{}}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                      <tr
                        onClick={() =>
                          setExtractedSkills([
                            {
                              skill: "Java",
                              experience: "0",
                              required: false,
                              validated: false,
                              edit: false,
                            },
                          ])
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <td>Java Developer</td>
                        <td>
                          <span class="badge text-bg-success">Done</span>
                        </td>
                        <td className="d-flex align-items-center ">
                          <button
                            className=" btn-sm  px-1 py-1  m-0   border-0 bg-white   "
                            style={{}}
                            onClick={() => setEditJd(!editJd)}
                          >
                            <MdEdit />
                          </button>
                          <button
                            className=" btn-sm  px-1 py-1  m-0   border-0 bg-white   "
                            style={{}}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              </div>
              <div className="d-flex  justify-content-between mx-1 "></div>

              <div className="px-2 py-2 font-6"></div>

              <div
                class="accordion accordion-flush mb-5 "
                id="accordionPanelsStayOpenExample"
              >
                <div class="accordion-item">
                  <h2 class="accordion-header rounded-top-2 ">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#panelsStayOpen-collapseThree"
                      aria-expanded="false"
                      aria-controls="panelsStayOpen-collapseThree"
                      style={{ backgroundColor: "#F7FFDD", color: "#815F0B" }}
                    >
                      Premium Services
                    </button>
                  </h2>
                  <div
                    id="panelsStayOpen-collapseThree"
                    class="accordion-collapse collapse"
                  >
                    <div class="accordion-body px-0 ">
                      <table className="table table-sm table-hover ">
                        <tbody>
                          <tr onClick={() => setselected("PremiumService")}>
                            <td>Background checks</td>
                            <td>
                              <MdVerifiedUser />
                            </td>
                          </tr>
                          <tr>
                            <td>Custom Analytics</td>
                            <td>
                              <IoMdAnalytics />
                            </td>
                          </tr>
                          <tr onClick={() => setselected("PremiumService")}>
                            <td>Conversational AI</td>
                            <td>
                              <GiArtificialIntelligence />
                            </td>
                          </tr>
                          <tr onClick={() => setselected("PremiumService")}>
                            <td>Pre-Offer</td>
                            <td>
                              <BiSolidOffer />
                            </td>
                          </tr>
                          <tr onClick={() => setselected("JdParsing")}>
                            <td>JD Parsing</td>
                            <td>
                              <ImSortAlphaDesc />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="vr m-0 p-0" />

            <div
              className="col-lg-7 col-sm-12   rounded bg-white     font-5 overflow-y-auto   "
              style={{ height: contentHeight }}
            >
              <div className="d-flex align-items-center justify-content-end mb-2  "></div>

              {/* cards */}
              <div>
                <div id="map" style={{ height: "0", width: "100%" }}></div>

                {selected === "no" && (
                  <>
                    <>
                      <UserCardA
                        name="David Marcos"
                        image={user}
                        email="david@gmail.com"
                        phone="5710838457"
                      />
                      <UserCardA
                        name="Confidential"
                        image={placeholderImage}
                        email="****@gmail.com"
                        phone="57********"
                      />
                    </>
                  </>
                )}

                {selected === "PremiumService" && (
                  <>
                    {/* back button */}
                    <button
                      className="input-group-text  mt-4   ms-1 primary-green "
                      style={{
                        backgroundColor: "#",
                        color: "#815F0B",
                        borderStyle: "solid",
                        borderColor: "",
                      }}
                      onClick={() => setselected("")}
                    >
                      Back
                    </button>
                    <PremiumService />
                  </>
                )}
                {selected === "" && (
                  <>
                    {loading ? (
                      <div className="full-body-spinner">
                        <div className="spinner"></div>
                      </div>
                    ) : (
                      (extractedSkills.length > 0 ||
                        listOfSkills.length > 0) && (
                        <>
                          <div className=" ">
                            <div
                              className="accordion     "
                              id="accordionPanelsStayOpenExample"
                            >
                              <div className="accordion-item border-0  mb-2 rounded-top  ">
                                <h2
                                  className="accordion-header  "
                                  style={{ height: "" }}
                                >
                                  <button
                                    className="accordion-button d-block d-lg-flex   py-2    justify-content-between "
                                    onClick={handleAccordion1}
                                    style={{
                                      backgroundColor: "#F7FFDD",
                                      color: "#815F0B",
                                    }}
                                    type="button"
                                    data-bs-toggle="collapse"
                                  >
                                    <div
                                      className="    "
                                      style={{ minWidth: "" }}
                                    >
                                      {" "}
                                      Job Description
                                    </div>
                                  </button>
                                </h2>
                                <div
                                  id="panelsStayOpen-collapseOne"
                                  className="accordion-collapse   collapse show"
                                >
                                  <div>
                                    <div className="d-flex  justify-content-between align-items-center mt-1 ">
                                      <div className="d-flex mx-1  my-2 align-items-center  ">
                                        <b>JD Name:</b>{" "}
                                        {editJd ? (
                                          <input
                                            type="text"
                                            className="form-control w-auto  ms-1 "
                                            style={{
                                              height: "24px",
                                              width: "70px",
                                            }}
                                            value={"React Developer"}
                                          />
                                        ) : (
                                          "React Developer"
                                        )}
                                      </div>
                                      <div>
                                        <button
                                          className="btn  mt-1     ms-1 primary-green "
                                          style={{
                                            backgroundColor: "#",
                                            color: "#815F0B",
                                            borderStyle: "solid",
                                            borderColor: "",
                                          }}
                                          data-bs-toggle="modal"
                                          data-bs-target="#exampleModal"
                                        >
                                          Add New Skill
                                        </button>
                                      </div>
                                    </div>

                                    <div className="ms-1 d-flex   ">
                                      <div>
                                        <b>Status: </b>{" "}
                                        {editJd ? (
                                          <select
                                            class="  border-0  "
                                            style={{ color: "#815F0B" }}
                                            aria-label="Default select example"
                                          >
                                            <option selected>Pending</option>
                                            <option value="Done">Done</option>
                                          </select>
                                        ) : (
                                          <span class="badge text-bg-warning">
                                            Pending
                                          </span>
                                        )}
                                      </div>
                                      <div className="ms-5">
                                        <i>
                                          <b>Date Created:</b>{" "}
                                          {new Date().toLocaleDateString()}
                                        </i>
                                      </div>
                                    </div>

                                    <div className="mx-1 mt-3 d-flex">
                                      <div>
                                        <b>First Name: </b>
                                        {resumeData?.firstName || "-"}
                                      </div>
                                      <div className="ms-5">
                                        <b>Last Name: </b>
                                        {resumeData?.lastName || "-"}
                                      </div>
                                    </div>

                                    <div className="mx-1 mt-3 d-flex">
                                      <div>
                                        <b>Contact No.: </b>
                                        {resumeData?.contactNo || "-"}
                                      </div>
                                      <div className="ms-5">
                                        <b>Email: </b>
                                        {resumeData?.email ? (
                                          <a
                                            href={`mailto:${resumeData?.email}`}
                                          >
                                            {resumeData?.email}
                                          </a>
                                        ) : (
                                          "-"
                                        )}
                                      </div>
                                    </div>

                                    <div className="mx-1 mt-3 d-flex">
                                      <div>
                                        <b>LinkedIn.: </b>
                                        {resumeData?.linkedIn ? (
                                          <a href={resumeData?.linkedIn}>
                                            {resumeData?.linkedIn}
                                          </a>
                                        ) : (
                                          "-"
                                        )}
                                      </div>
                                      <div className="ms-5">
                                        <b>Github: </b>
                                        {resumeData?.github ? (
                                          <a href={resumeData?.github}>
                                            {resumeData?.github}
                                          </a>
                                        ) : (
                                          "-"
                                        )}
                                      </div>
                                    </div>

                                    <Tables
                                      {...{
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
                                      }}
                                    />

                                    <div class="mb-2 mt-4 row ">
                                      <div className="col-5">
                                        <div className=" d-flex align-items-center   ">
                                          <div>
                                            <label
                                              for="exampleFormControlInput1 "
                                              class="form-label mt-1 "
                                            >
                                              <b>Location:</b>{" "}
                                            </label>
                                          </div>
                                          <input
                                            type="text"
                                            class="form-control ms-1  "
                                            id="exampleFormControlInput1"
                                            placeholder=""
                                            style={{ height: "24px" }}
                                          />
                                        </div>
                                        <div className="d-flex justify-content-end align-items-center px-0 my-2    ">
                                          <div>
                                            <label
                                              htmlFor=""
                                              className=" pe-2  "
                                            >
                                              Radius
                                            </label>
                                          </div>
                                          <div>
                                            <select
                                              class="  border-0  "
                                              style={{ color: "#815F0B" }}
                                              aria-label="Default select example"
                                            >
                                              <option selected>15</option>
                                              <option value="40">40</option>
                                              <option value="55">55</option>
                                              <option value="80">80</option>
                                              <option value="120">120</option>
                                              <option value="160">160</option>
                                            </select>
                                            <select
                                              class="  border-0  "
                                              style={{ color: "#815F0B" }}
                                              aria-label="Default select example"
                                            >
                                              <option selected>Mile</option>
                                              <option value="KM">KM</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {editJd && (
                                      <button
                                        type="button"
                                        className="btn text-white font-5 mb-3  mx-2  "
                                        style={{ backgroundColor: "#815F0B" }}
                                      >
                                        Save
                                      </button>
                                    )}
                                    <span
                                      class="badge font-5 mb-3 border-1"
                                      style={{
                                        backgroundColor: "#815F0B",
                                        color: "white",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setShowSearch(true)}
                                    >
                                      Search
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* search results  */}

                          {showSearch && (
                            <div
                              className="accordion     "
                              id="accordionPanelsStayOpenExample"
                            >
                              <div className="accordion-item border-0  mb-2 rounded-top  ">
                                <h2 className="accordion-header ">
                                  <button
                                    className="accordion-button d-block d-lg-flex   py-2   justify-content-between "
                                    onClick={handleAccordion2}
                                    style={{
                                      backgroundColor: "#F7FFDD",
                                      color: "#815F0B",
                                    }}
                                    type="button"
                                    data-bs-toggle="collapse"
                                  >
                                    <div
                                      className="    "
                                      style={{ minWidth: "" }}
                                    >
                                      {" "}
                                      Search Results
                                    </div>
                                  </button>
                                </h2>
                                <div
                                  id="panelsStayOpen-collapseTwo"
                                  className="accordion-collapse   collapse show"
                                >
                                  <div>
                                    {/* filter tab nav */}
                                    <div className="d-md-flex align-items-center justify-content-end  my-1 ">
                                      <div className="d-flex align-items-center ">
                                        {/* filter tab */}
                                        <div className="d-flex ms-2 align-items-center  font-6 ">
                                          <div className="font-5">
                                            <b>Filter:</b>
                                          </div>
                                          <select
                                            class="  border-0  "
                                            style={{ color: "#815F0B" }}
                                            aria-label="Default select example"
                                          >
                                            <option disabled selected hidden>
                                              Skills
                                            </option>
                                            <option value="react">React</option>
                                            <option value="javascript">
                                              Javascript
                                            </option>
                                            <option value="java">Java</option>
                                          </select>
                                          <select
                                            class="  border-0  ms-2  "
                                            style={{ color: "#815F0B" }}
                                            aria-label="Default select example"
                                          >
                                            <option disabled selected hidden>
                                              Location
                                            </option>
                                            <option value="chennai">
                                              Chennai
                                            </option>
                                            <option value="bangalore">
                                              Bangalore
                                            </option>
                                            <option value="hyderabad">
                                              Hyderabad
                                            </option>
                                          </select>
                                          <select
                                            class="  border-0  ms-2  "
                                            style={{ color: "#815F0B" }}
                                            aria-label="Default select example"
                                          >
                                            <option disabled selected hidden>
                                              Experience
                                            </option>
                                            <option value="freshers">
                                              Freshers
                                            </option>
                                            <option value="1-2">1-2</option>
                                            <option value="2-3">2-3</option>
                                            <option value="more than 3">
                                              more than 3
                                            </option>
                                            <option value="more than 5">
                                              more than 5
                                            </option>
                                          </select>
                                          <div
                                            class="form-check form-switch ms-2 mt-1 "
                                            style={{ color: "#815F0B" }}
                                          >
                                            <label
                                              class="form-check-label"
                                              for="flexSwitchCheckChecked"
                                            >
                                              Mandatory
                                            </label>
                                            <input
                                              class="form-check-input"
                                              type="checkbox"
                                              role="switch"
                                              id="flexSwitchCheckChecked"
                                            />
                                          </div>
                                          <div
                                            class=" d-flex   ms-4 me-2  mb-1  "
                                            style={{ color: "#815F0B" }}
                                          >
                                            <input
                                              class=""
                                              type="checkbox"
                                              value=""
                                              id="flexCheckDefault"
                                            />
                                            <label
                                              class="form-check-label ms-1 "
                                              for="flexCheckDefault"
                                            >
                                              Clear Filters
                                            </label>
                                          </div>
                                        </div>

                                        <div className="btn-group ms-4  ">
                                          <button
                                            className="btn text-start font-6  ms-1   "
                                            type="button"
                                            style={
                                              view === "card"
                                                ? active
                                                : Inactive
                                            }
                                            onClick={() => setView("card")}
                                          >
                                            Card
                                          </button>
                                          <button
                                            className="btn text-start font-6    "
                                            type="button"
                                            style={
                                              view === "list"
                                                ? active
                                                : Inactive
                                            }
                                            onClick={() => setView("list")}
                                          >
                                            List
                                          </button>
                                          <button
                                            className="btn text-start font-6    "
                                            type="button"
                                            style={
                                              view === "map" ? active : Inactive
                                            }
                                            onClick={() => setView("map")}
                                          >
                                            Map
                                          </button>
                                        </div>

                                        <div class="btn-group dropend">
                                          <button
                                            className="border-0    bg-white"
                                            onClick={() =>
                                              setExportOptions(!exportOptions)
                                            }
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="Export"
                                          >
                                            <LiaFileExportSolid
                                              style={{ fontSize: "30px" }}
                                            />
                                          </button>
                                        </div>
                                      </div>
                                      <div className=""></div>
                                    </div>

                                    <div
                                      className="mx-1 my-1  bg-body-tertiary row border mb-2   "
                                      style={{
                                        borderRadius: "10px",
                                        borderColor: "#815F0B",
                                        borderStyle: "solid",
                                      }}
                                    >
                                      <div className="col-3 text-center mt-3  ">
                                        <div class="avatar ">
                                          <img
                                            src={user}
                                            alt="..."
                                            class="avatar-img rounded-circle"
                                            width="90px"
                                          />
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="row">
                                          <div className="col-7">
                                            <div>
                                              <h5 class="mb-1 mt-2">
                                                David Marcos
                                              </h5>
                                              <p class="small mb-3">
                                                <span class="badge badge-dark bg-black  ">
                                                  California, United States{" "}
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="row">
                                          <div className="col-7 ">
                                            <table className="table table-sm">
                                              <thead>
                                                <tr>
                                                  <th>Skill</th>
                                                  <th>Experience</th>
                                                  <th>Validation</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td>React</td>
                                                  <td>1 yrs</td>
                                                  <td>Yes</td>
                                                </tr>
                                                <tr>
                                                  <td>Javascript</td>
                                                  <td>1 yrs</td>
                                                  <td>No</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                          <div class="col">
                                            <p class="small mb-0 text-muted">
                                              DocuSign
                                            </p>
                                            <p class="small mb-0 text-muted">
                                              Los Gatos, California, United
                                              States{" "}
                                            </p>
                                            <p class="small mb-0 text-muted">
                                              David@gmail.com
                                            </p>
                                            <p class="small mb-0 text-muted">
                                              9710838457
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )
                    )}

                    {/* modal */}
                    {fileupload && (
                      <div
                        class="modal show  d-block "
                        id="upload"
                        tabindex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="false"
                      >
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-body">
                              <>
                                <FileuploadJd
                                  handleFileClose={() => setFileupload(false)}
                                  files={files}
                                  setFiles={setFiles}
                                  fileupload={uploadFile}
                                />
                              </>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <hr className="vr m-0 p-0" />

            <div className="col-lg col-sm-12   rounded bg-white px-1 font-5 fixed-sidebar">
              <RightSideBar />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default JdBasedSearch;
