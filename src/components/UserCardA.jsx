import React, { useState } from 'react'

const UserCardA = ({name,image,email,phone}) => {

    const active = { backgroundColor: "#EFF5DC", borderStyle: "solid", borderColor: "#815F0B", color: "#815F0B" };

    // summary and details
    const [summary, setSummary] = useState(false)
    const [details, setDetails] = useState(false)

    const handleSummaryClick1 = () => {
        setDetails(false)
        setSummary(!summary)
    }

    const handleDetailsSummary1 = () => {
        setSummary(false)
        setDetails(!details)
    }


    return (
        <div>
            <div className='mx-1 my-1  bg-body-tertiary row border mb-2   ' style={{
                borderRadius: "10px", borderColor: "#815F0B", borderStyle: "solid"
            }}>
                <div className='col-3 text-center mt-3  '>
                    <div class="avatar ">
                        <img src={image}   alt="..." class="avatar-img rounded-circle" width="90px"  />
                    </div>
                </div>
                <div className="col">
                    <div className='row'>
                        <div className='col-7'>
                            <div>
                                <h5 class="mb-1 mt-2">{ name}</h5>
                                <p class="small mb-3"><span class="badge badge-dark bg-black  ">California, United States </span></p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className='col-7 '>
                            <p class="text-muted">
                                I enjoy helping visionary business leaders achieve superior results, by leveraging leading technology. I build sales organizations for growth SaaS companies, equipping teams to help their customers justify investments in premium solutions. Together, my sales teams and our customers generate huge improvements in financial performance.
                            </p>
                        </div>
                        <div class="col">
                            <p class="small mb-0 text-muted">DocuSign</p>
                            <p class="small mb-0 text-muted">Los Gatos, California, United States </p>
                            <p class="small mb-0 text-muted">{ email }</p>
                            <p class="small mb-0 text-muted">{  phone}</p>

                            <div className='mt-1  ' >
                                <button className="btn-sm border px-2 rounded py-2 text-start font-6  me-1   " type="button" style={active} onClick={handleSummaryClick1}  >
                                    Skill Profile
                                </button>
                                <button className="btn-sm border px-2 rounded py-2    text-start font-6  me-1   " type="button" style={active} onClick={handleDetailsSummary1}  >
                                    Detailed Profile
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <div>

                    {/* summary */}
                    {summary &&
                        <div>
                            <div className='font-3 font-weight-2'>Summary</div>
                            <div className='ms-3'>

                                <div className='my-2  font-weight-2 font-15px'>Skill Applied or Used at:</div>
                                <div className="  ">


                                    {/* table start */}
                                    <div className="table-responsive ">
                                        <table className='table table-sm   table-fixed     '>
                                            <thead >
                                                <tr className=''>
                                                    <th scope="col" className='bg-body- ' style={{ width: "34%" }}>Project</th>
                                                    <th scope="col" className='bg-body- ' style={{ width: "13%" }}>Duration</th>
                                                    <th scope="col" className='bg-body- ' style={{ width: "17%" }}>  Type</th>
                                                    <th scope="col" className='bg-body- ' style={{ width: "15%" }}>Location</th>
                                                    <th scope="col" style={{ width: "12%" }}>Validation</th>
                                                </tr>
                                            </thead>

                                            <tbody className=''>
                                                <tr className=''>
                                                    <td >Lead Generation Campaign</td>
                                                    <td >2 mos</td>
                                                    <td >Employment</td>
                                                    <td>San Francisco</td>
                                                    <td className='text-center '>Yes</td>

                                                </tr>
                                                <tr className='   '  >
                                                    <td >Sales CRM Implementation</td>
                                                    <td >1 yrs</td>
                                                    <td >Employment</td>
                                                    <td>San Francisco</td>
                                                    <td className='text-center '>No</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* table end */}

                                </div>

                                <div className='my-2  font-weight-2 font-15px'>Skill Acquired or Learnt at:</div>
                                <div className="  ">

                                    {/* table start */}
                                    <div className="table-responsive ">
                                        <table className='table table-sm   table-fixed     '>
                                            <thead >
                                                <tr className=''>
                                                    <th scope="col" style={{ width: "34%" }}>Source</th>
                                                    <th scope="col" className='bg-body- ' style={{ width: "13%" }}>Duration</th>
                                                    <th scope="col" style={{ width: "17%" }}>  Type</th>
                                                    <th scope="col" style={{ width: "15%" }}>Location</th>
                                                    <th scope="col" style={{ width: "12%" }}>Validation</th>
                                                </tr>
                                            </thead>

                                            <tbody className=''>
                                                <tr className=''>
                                                    <td >Salesforce Certified Sales Cloud</td>
                                                    <td>1 yrs</td>
                                                    <td >Certification</td>
                                                    <td>San Francisco</td>
                                                    <td className='text-center '>Yes</td>

                                                </tr>
                                                <tr className=''>
                                                    <td >Google Ads Certification</td>
                                                    <td>6 mos</td>
                                                    <td >Certification</td>
                                                    <td>San Francisco</td>
                                                    <td className='text-center '>No</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* table end */}

                                </div>

                            </div>
                        </div>
                    }

                    {/* detils */}
                    {details &&
                        <div>
                            <div className='font-3 font-weight-2'>Detail</div>

                            <div className='ms-3 '>
                                <div className=" ">

                                    <div className='my-2  font-weight-2 font-15px '>Skill Applied or Used at:</div>
                                    {/* table start */}
                                    <div className="table-responsive " >
                                        <table className='table table-sm  table-borderless     table-fixed     '>
                                            {/* <thead > */}
                                            <tr className='border-bottom '>
                                                <th scope="col" className='bg-body- ' style={{ width: "34%" }}>Project</th>
                                                <th scope="col" className='bg-body- ' style={{ width: "13%" }}>Duration</th>
                                                <th scope="col" className='bg-body- ' style={{ width: "17%" }}>  Type</th>
                                                <th scope="col" className='bg-body- ' style={{ width: "14%" }}>Location</th>
                                                <th scope="col" className='text-center' style={{ width: "12%" }}>Validation</th>
                                                <th scope="col" className='bg-body- ' style={{ width: "10%" }}></th>
                                            </tr>


                                        </table>
                                        {/* row 1 */}
                                        <div className='border-bottom   '>
                                            <div className='d-flex   '>
                                                <div className='  ' style={{ width: "34%" }}>Lead Generation Campaign		</div>
                                                <div style={{ width: "13%" }}>2 mos</div>
                                                <div className='    ' style={{ width: "17%" }}>Employment</div>
                                                <div className='    ' style={{ width: "14%" }}>San Francisco</div>
                                                <div className='ps-2 ' style={{ width: "12%" }}>Yes</div>

                                            </div>
                                            <div className='my-3  '>
                                                <div className='d-flex align-items-center  '>
                                                    <div className='d-flex ps-5  ' style={{ width: "64%" }} > <b>Organization:</b>
                                                        <div>DocuSign</div>
                                                    </div>
                                                    <div className='d-flex font-6 ' style={{ width: "14%" }}>
                                                        <b>From:</b>
                                                        <div>01/01/2021</div>
                                                    </div>
                                                    <div className='d-flex font-6 ps-2 ' style={{ width: "22%" }}>
                                                        <b>To:</b>
                                                        <div>01/03/2021</div>
                                                    </div>
                                                </div>
                                                <div className='pb-1 pt-2 ps-5  '><b>Brief Description:</b> </div>
                                                <div className='ms-4 ps-5   '>Lead generation campaign where you identify and qualify leads for a specific product or service. Use various online tools and strategies, such as LinkedIn prospecting, email marketing, or content marketing, to generate leads.</div>
                                                <div className='pb-1 pt-2  ps-5 '><b>Validation:</b> </div>
                                                <div className='ps-5 d-flex justify-content-between ms-2 me-4   '>
                                                    <table className='ms-3  '>

                                                        <tr>
                                                            <td><b>Validator Name</b> </td>
                                                            <td>:Appy Choudhary</td>
                                                        </tr>

                                                        <tr>
                                                            <td><b>Email Id</b> </td>
                                                            <td>:Choudhary@gmail.com</td>
                                                        </tr>

                                                    </table>
                                                    <table className='ms-3 '>
                                                        <tr>
                                                            <td><b>Relationship</b> </td>
                                                            <td>:Own Team Member</td>
                                                        </tr>
                                                        <tr>
                                                            <td><b>Mobile Number</b> </td>
                                                            <td>:5710838457</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                                <div className='ms-5  mt-2   '><b>Remarks:</b> </div>
                                                <div className='ms-5 ps-4    mt-1   '>
                                                    David Simon's performance on the lead generation campaign has been exceptional. His dedication and hard work significantly contributed to our ability to identify and qualify leads effectively.
                                                </div>

                                            </div>
                                        </div>
                                        {/* row 2 */}

                                        <div className='border-bottom pt-2 '>
                                            <div className='d-flex   '>
                                                <div className='  ' style={{ width: "34%" }}>Sales CRM Implementation</div>
                                                <div style={{ width: "13%" }}>2 yrs</div>
                                                <div className='    ' style={{ width: "17%" }}>Employment</div>
                                                <div className='    ' style={{ width: "14%" }}>San Francisco</div>
                                                <div className='text-center ' style={{ width: "12%" }}>No</div>

                                            </div>
                                            <div className='my-3  '>
                                                <div className='d-flex align-items-center  '>
                                                    <div className='d-flex ps-5  ' style={{ width: "64%" }} > <b>Organization:</b>
                                                        <div>DocuSign</div>
                                                    </div>
                                                    <div className='d-flex font-6 ' style={{ width: "14%" }}>
                                                        <b>From:</b>
                                                        <div>01/01/2021</div>
                                                    </div>
                                                    <div className='d-flex font-6 ps-2 ' style={{ width: "22%" }}>
                                                        <b>To:</b>
                                                        <div>01/01/2022</div>
                                                    </div>
                                                </div>
                                                <div className='pb-1 pt-2 ps-5  '><b>Brief Description:</b> </div>
                                                <div className='ms-4 ps-5   '>
                                                    A Customer Relationship Management (CRM) system and implement it for a small business or organization. Customize it to track leads, manage contacts, and automate follow-up processes.
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    {/* table end */}
                                </div>

                                <div className='my-2 mt-3  font-weight-2 font-15px'>Skill Acquired or Learnt at:</div>

                                {/* table start */}
                                <div className="table-responsive ">
                                    <table className='table table-sm  table-borderless     table-fixed     '>
                                        {/* <thead > */}
                                        <tr className='border-bottom '>
                                            <th scope="col" style={{ width: "34%" }}>Source</th>
                                            <th scope="col" className='bg-body- ' style={{ width: "13%" }}>Duration</th>
                                            <th scope="col" style={{ width: "17%" }}>  Type</th>
                                            <th scope="col" style={{ width: "14%" }}>Location</th>
                                            <th scope="col" className='text-center' style={{ width: "12%" }}>Validation</th>
                                        </tr>

                                    </table>
                                    {/* row 1 */}
                                    <div className='border-bottom pt-2 '>
                                        <div className='d-flex   '>
                                            <div className='  ' style={{ width: "34%" }}>Salesforce Certified Sales Cloud</div>
                                            <div style={{ width: "13%" }}>1 yrs</div>
                                            <div className='    ' style={{ width: "17%" }}>Certification</div>
                                            <div className='    ' style={{ width: "14%" }}>San Francisco	</div>
                                            <div className='ps-2 ' style={{ width: "12%" }}>Yes</div>

                                        </div>
                                        <div className='my-3  '>
                                            <div className='d-flex align-items-center  '>
                                                <div className='d-flex ps-5  ' style={{ width: "64%" }} > <b>Organization:</b>
                                                    <div>Salesforce</div>
                                                </div>
                                                <div className='d-flex font-6 ' style={{ width: "14%" }}>
                                                    <b>From:</b>
                                                    <div>07/08/2021</div>
                                                </div>
                                                <div className='d-flex font-6 ps-2 ' style={{ width: "22%" }}>
                                                    <b>To:</b>
                                                    <div>07/08/2022</div>
                                                </div>
                                            </div>

                                            <div className='pb-1 pt-2 ps-5  '><b>Brief Description:</b> </div>
                                            <div className='ms-4 ps-5   '>
                                                Salesforce offers certifications related to its Sales Cloud platform, which is widely used in sales development and customer relationship management (CRM).
                                            </div>
                                            <div className='pb-1 pt-2  ps-5 '><b>Validation:</b> </div>
                                            <div className='ps-5 d-flex justify-content-between ms-2 me-4   '>
                                                <table className='ms-3  '>

                                                    <tr>
                                                        <td><b>Validator Name</b> </td>
                                                        <td>:Appy Choudhary</td>
                                                    </tr>

                                                    <tr>
                                                        <td><b>Email Id</b> </td>
                                                        <td>:Choudhary@gmail.com</td>
                                                    </tr>

                                                </table>
                                                <table className='ms-3 '>
                                                    <tr>
                                                        <td><b>Relationship</b> </td>
                                                        <td>:Own Team Member</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>Mobile Number</b> </td>
                                                        <td>:5710838457</td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div className='ms-5  mt-2   '><b>Remarks:</b> </div>
                                            <div className='ms-5 ps-4    mt-1   '>
                                                David Simon's performance on the lead generation campaign has been exceptional. His dedication and hard work significantly contributed to our ability to identify and qualify leads effectively.
                                            </div>

                                        </div>

                                    </div>

                                    {/* row 2 */}

                                    <div className='border-bottom pt-2 '>
                                        <div className='d-flex   '>
                                            <div className='  ' style={{ width: "34%" }}>Google Ads Certification</div>
                                            <div style={{ width: "13%" }}>6 mos</div>
                                            <div className='    ' style={{ width: "17%" }}>Certification</div>
                                            <div className='    ' style={{ width: "14%" }}>San Francisco	</div>
                                            <div className='ps-2 ' style={{ width: "12%" }}>No</div>

                                        </div>
                                        <div className='my-3  '>
                                            <div className='d-flex align-items-center  '>
                                                <div className='d-flex ps-5  ' style={{ width: "64%" }} > <b>Organization:</b>
                                                    <div>Goggle</div>
                                                </div>
                                                <div className='d-flex font-6 ' style={{ width: "14%" }}>
                                                    <b>From:</b>
                                                    <div>07/08/2021</div>
                                                </div>
                                                <div className='d-flex font-6 ps-2 ' style={{ width: "22%" }}>
                                                    <b>To:</b>
                                                    <div>07/02/2022</div>
                                                </div>
                                            </div>

                                            <div className='pb-1 pt-2 ps-5  '><b>Brief Description:</b> </div>
                                            <div className='ms-4 ps-5   '>
                                                Certification can be valuable for understanding website analytics, tracking user behavior, and optimizing online marketing campaigns, all of which are important in sales development
                                            </div>


                                        </div>
                                    </div>
                                </div>
                                {/* table end */}

                            </div>
                        </div>
                    }

                </div>
            </div>

        </div>
    )
}

export default UserCardA