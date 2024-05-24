import React, { useEffect, useState } from 'react';
import logo from "../images/logo.jpeg"
import { AiFillPrinter, AiOutlineClose } from 'react-icons/ai';
import { FcMenu } from 'react-icons/fc';
import FlagSelection from './FlagSelection';
import user from "../images/user.jpeg"


const NavbarA = ({ handlePdf }) => {
  // check local storage if present put in state or else default values
  const [Country, setCountry] = useState({ countryCode: "US", countryName: "United States" });
  // const [Country, setCountry] = useState({ countryCode: localStorage.getItem("countryCode") || "US", countryName: localStorage.getItem("countryName") || "United States" });
  const [ShowDropDown, setShowDropDown] = useState(false)
  const [menu, setMenu] = useState(false)
  const [profileOptionShow, setProfileOptionShow] = useState(false)


  useEffect(() => {
    // storing country code in local storage
    localStorage.setItem("countryCode", Country.countryCode)
    localStorage.setItem("countryName", Country.countryName)
  }, [Country])



  const handleDropDown = ({ handlePdf }) => {
    setShowDropDown(!ShowDropDown)
  }

  const handlePrint = () => {
    handlePdf()
  }

 

  const handleLanguageChange = (event) => {
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("candId");

  }

  return (
    <>
      {/* modal setting tab */}
      <div class="modal fade modal-xl" id="setting" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Profile</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div className=''>
                <div>
                  <div class="container">
                    <div class="row justify-content-center mb-4 pb-2  ">
                      <div class="col-12    bg-body-secondary   ">
                        <div class="">

                          <form>
                            <div class="row mt-2  align-items-center">
                              <div class="col-md-3 text-center mb-5">
                                <div class="avatar avatar-xl">
                                  <img src={user} alt="..." class="avatar-img rounded-circle" />
                                </div>
                              </div>
                              <div class="col">
                                <div class="row align-items-center">
                                  <div class="col-md-7">
                                    <h4 class="mb-1 mt-2 ">David</h4>
                                    <p class="small mb-3"><span class="badge badge-dark bg-black  "> Texas, USA</span></p>
                                  </div>
                                </div>
                                <div class="row mb-4">
                                  <div class="col-md-7">
                                    <p class="text-muted">
                                      I enjoy helping visionary business leaders achieve superior results, by leveraging leading technology. I build sales organizations for growth SaaS companies, equipping teams to help their customers justify investments in premium solutions. Together, my sales teams and our customers generate huge improvements in financial performance.                                    </p>
                                  </div>
                                  <div class="col">
                                    <p class="small mb-0 text-muted">DocuSign</p>
                                    <p class="small mb-0 text-muted">Los Gatos, California, United States </p>
                                    <p class="small mb-0 text-muted">5710838457</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <hr class="" />
                            <div class="form-row row my-2  ">
                              <div class="form-group col-md-6">
                                <label for="firstname">First Name</label>
                                <input type="text" style={{ height: "32px" }} id="firstname" class="form-control  " />
                              </div>
                              <div class="form-group col-md-6">
                                <label for="lastname">Last Name</label>
                                <input type="text" style={{ height: "32px" }} id="lastname" class="form-control" />
                              </div>
                            </div>
                            <div class="form-row row my-2  ">
                              <div class="form-group my-2 col-md-6">
                                <label for="inputEmail4">Email</label>
                                <input type="text" style={{ height: "32px" }} class="form-control" id="inputEmail4" />
                              </div>
                              <div class="form-group my-2 col-md-6">
                                <label for="inputEmail4">Phone Number</label>
                                <input type="text" style={{ height: "32px" }} class="form-control" id="inputEmail4" />
                              </div>
                            </div>
                            <div class="form-row row my-2  ">
                              <div class="form-group my-2 col-md-6">
                                <label for="inputEmail4">Gender</label>
                                <input type="text" style={{ height: "32px" }} class="form-control" id="inputEmail4" />
                              </div>
                              <div class="form-group my-2 col-md-6">
                                <label for="inputEmail4">Date of birth</label>
                                <input type="date" style={{ height: "32px" }} class="form-control" id="inputEmail4" />
                              </div>
                            </div>
                            <div class="form-row row my-2  ">
                              <div class="form-group my-2 col-md-6">
                                <label for="inputAddress5">Address</label>
                                <input type="text" style={{ height: "32px" }} class="form-control" id="inputAddress5" />
                              </div>
                              <div class="form-group my-2 col-md-6">
                                <label for="inputAddress5">City</label>
                                <input type="text" style={{ height: "32px" }} class="form-control" id="inputAddress5" />
                              </div>
                            </div>
                            <div class="form-row row my-2">
                              <div class="form-group col-md-4 ">
                                <label for="inputState5">State</label>
                                <input type="text" style={{ height: "32px" }} class="form-control" id="inputState5" />
                              </div>
                              <div class="form-group col-md-6">
                                <label for="inputCompany5">Country</label>
                                <input type="text" style={{ height: "32px" }} class="form-control" id="inputCompany5" />
                              </div>

                              <div class="form-group col-md-2">
                                <label for="inputZip5">Zip</label>
                                <input type="text" style={{ height: "32px" }} class="form-control" id="inputZip5" />
                              </div>
                            </div>

                            <div class="form-group ">
                              <label for="inputZip5">Company</label>
                              <input type="text" style={{ height: "32px" }} class="form-control" id="inputZip5" />
                            </div>

                            <div className='mt-3 ' >
                              <label for="inputZip5">Profile Picture</label>
                              <div class="input-group mb-3">
                                <input type="file" class="form-control" id="inputGroupFile02" />
                                <label class="input-group-text" for="inputGroupFile02">Upload</label>
                              </div>
                            </div>
                            {/* text area */}
                            <div class="form-group">
                              <label for="exampleFormControlTextarea1">About</label>
                              <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                            </div>

                            <button type="submit" class="btn text-white mt-3 " style={{ backgroundColor: "#815F0B" }}>Save Change</button>


                            <hr class="my-4" />
                            <div class="row mb-4">
                              <div class="col-md-6">
                                <div class="form-group my-1 ">
                                  <label for="inputPassword4">Old Password</label>
                                  <input type="password" style={{ height: "32px" }} class="form-control" id="inputPassword5" />
                                </div>
                                <div class="form-group my-1 ">
                                  <label for="inputPassword5">New Password</label>
                                  <input type="password" style={{ height: "32px" }} class="form-control" id="inputPassword5" />
                                </div>
                                <div class="form-group my-1 ">
                                  <label for="inputPassword6">Confirm Password</label>
                                  <input type="password" style={{ height: "32px" }} class="form-control" id="inputPassword6" />
                                </div>
                              </div>
                              <div class="col-md-6">
                                <p class="mb-2">Password requirements</p>
                                <p class="small text-muted mb-2">To create a new password, you have to meet all of the following requirements:</p>
                                <ul class="small text-muted pl-4 mb-0">
                                  <li>Minimum 8 character</li>
                                  <li>At least one special character</li>
                                  <li>At least one number</li>
                                  <li>Can’t be the same as a previous password</li>
                                </ul>
                              </div>
                            </div>
                            <button class="btn text-white mb-3 " style={{ backgroundColor: "#815F0B" }}>Reset Password</button>
                          </form>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
      {/* end */}
      <nav style={{ backgroundColor: "#F7FFDD", color: "#815F0B" }} className="navbar navbar-expand-lg d-print-none p-0 m-0   "  >
        <div className="container-fluid  ">
          <a className="navbar-brand d-flex align-items-center   " href="/">
            <img src={logo} alt="Logo" width="38" height="38" className="d-inline-block bg-img" />
            <div className='px-1 font-weight-1  font-1   ' style={{ color: "#815F0B", direction: "ltr" }}>Skills Dashboard</div>
          </a>

          <div className='d-flex align-items-center '>
            <ul className="nav   d-flex align-items-baseline d-none d-lg-flex     ">
              <li className="nav-item font-weight-bold pt-lg-4  ">
                {/* <Link style={{ color: "#F7FFDD", direction: "ltr" }} className={ "nav-link  text-gray py-0 my-0 px-2   "} to="/dashboard/conventionalsearch">Skill based Search</Link> */}
              </li>
              
              <li className="nav-item font-weight-bold pt-lg-4  ">
                {/* <Link style={{ color: "#F7FFDD", direction: "ltr" }} className={"  fw-bold  px-2   " } to="/dashboard/jdsearch">JD based Search</Link> */}
              </li>

              <button onClick={handlePrint} style={{ backgroundColor: "#F7FFDD", color: "#815F0B" }} className=' border-0   me-5   px-0   '>
                <AiFillPrinter className='   ' />
              </button>
            </ul>


            <div>
              <div className='d-flex  flex-column align-items-center  ' onClick={() => setProfileOptionShow(!profileOptionShow)} style={{ cursor: "pointer" }} >
                <img src={user} alt="Logo" width="32" height="32" className="d-inline-block rounded-circle ms-1 mt-1  " />
                <div className=' font-10px p-0 m-0 text-center '>David</div>
              </div>
              {profileOptionShow &&
                <div className='z-3  border px-2 py-1  mt-1  ' style={{ position: "absolute", backgroundColor: "white", borderRadius: "5px" }}>
                  <table className=' table-sm table-hover    ' >
                    <tr className=' ' >
                      <td>
                        <button className='btn' data-bs-toggle="modal" data-bs-target="#setting" >Profile</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button className='btn' onClick={handleLogout}  >Logout</button>
                      </td>
                    </tr>
                  </table>
                </div>}
            </div>




            {/* hamburger menu mobile */}
            <div className='d-flex d-lg-none ps-1 mb-2 pb-1  '  >
              {!menu && <button className=' border-0 navigation-bg-color  ' onClick={() => setMenu(true)} style={{ fontSize: "26px" }} >
                <FcMenu />
              </button>}
              {menu && <button className=' border-0 navigation-bg-color  ' onClick={() => setMenu(false)} style={{ fontSize: "26px" }} >
                <AiOutlineClose />
              </button>}
            </div>

            {/* flag */}
            <div class="   p-t-flag px-0 d-none d-lg-block   ">
              <button type="button" onClick={handleDropDown} class="btn border-0 p-0 m-0  ms-2  " data-bs-auto-close="outside">
                <img className='m-0 p-0 ' style={{ width: "18px" }} src={`https://flagsapi.com/${Country.countryCode}/flat/32.png`} alt="" />
                <div className='font-10px p-0 m-0 ' style={{ color: "#815F0B" }}>
                  {/* {Country.countryName} want to show 10letters if more than that print ... */}
                  {Country.countryName.length > 10 ? Country.countryName.slice(0, 10) + "..." : Country.countryName}
                </div>
              </button>
              {ShowDropDown && <div class={ShowDropDown ? "dropdown-menu show" : "dropdown-menu "} style={{ minWidth: "33px" }} >
                <div className=' table-responsive d-flex  font-5 ' style={{ height: "130px" }}>

                  <table className='table table-sm d-flex table-hover  '>

                    <tbody className='font-5' style={{ width: "5%" }} >
                      <FlagSelection setCountry={setCountry} setShowDropDown={setShowDropDown} />
                    </tbody>

                  </table>
                </div>
              </div>}
            </div>

            <div className='d-none d-lg-block '>
              <select class="  border-0   " style={{ backgroundColor: "#F7FFDD", color: "#815F0B" }} aria-label="Default select example" onChange={handleLanguageChange} value="en" >
                <option value="en" >En</option>
                <option value="HI" >Hi</option>
                <option value="ta">Tm</option>
                <option value="ar">Ar</option>
              </select>
            </div>

          </div>

          {menu && <div class="offcanvas-body mt-1 d-lg-none d-block   ">
            <ul class="   gap-2 d-flex flex-column justify-content-center align-content-center mx-auto my-0    list-unstyled   " style={{}} >
              <li className="nav-item  font-weight-bold  pt-lg-4 ">
                {/* <Link className={"nav-link  text-gray px-0 mx-2   "} aria-current="page" to="/dashboard/skillsearch">Skill Search</Link> */}
              </li>
              <li className="nav-item font-weight-bold pt-lg-4  ">
                {/* <Link className={ " text-brown fw-bold   " } to="/dashboard/conventionalsearch">Jd based Search</Link> */}
              </li>

              <li>

              </li>

            </ul>

            <div className=' d-flex align-items-center  mb-1    ' >
              <button onClick={handlePrint} className=' text-white font-weight-bold pt-lg-4 px-2 py-1 rounded    border-0 navigation-bg-color ' style={{ backgroundColor: "#F7FFDD", color: "#815F0B" }} >
                Print Resume <AiFillPrinter className='  ' />
              </button>

              {/* flag */}
              <div class="   px-0  ps-2     ">
                <button type="button" onClick={handleDropDown} class="btn border-0 p-0 m-0  ms-2  " data-bs-auto-close="outside">
                  <img className='m-0 p-0 ' style={{ width: "30px" }} src={`https://flagsapi.com/${Country.countryCode}/flat/32.png`} alt="" />
                  <div className='font-10px p-0 m-0 ' >
                    {/* {Country.countryName} want to show 10letters if more than that print ... */}
                    {Country.countryName.length > 10 ? Country.countryName.slice(0, 10) + "..." : Country.countryName}
                  </div>
                </button>
                {ShowDropDown && <div class={ShowDropDown ? "dropdown-menu show" : "dropdown-menu "} style={{ minWidth: "33px" }} >
                  <div className=' table-responsive d-flex  font-5 ' style={{ height: "130px" }}>

                    <table className='table table-sm d-flex table-hover  '>

                      <tbody className='font-5' style={{ width: "5%" }} >
                        <FlagSelection setCountry={setCountry} setShowDropDown={setShowDropDown} />
                      </tbody>

                    </table>
                  </div>
                </div>}
              </div>
            </div>

          </div>}
        </div>

      </nav>
    </>
  )
}

export default NavbarA;


