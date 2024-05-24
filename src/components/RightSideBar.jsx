
const RightSideBar = () => {


    return (
        <>
           
                <table className='table table-sm table-hover    ' >
                    <thead>
                        <tr>
                            <div className="mt-2  rounded-top  " style={{ backgroundColor: "#F7FFDD", height: "36px" }}>
                                <div className='text h6 text-center   ' style={{ padding: "6px 0", color:  "#815F0B" }} >Trending Skills</div>
                            </div>
                        </tr>
                    </thead>

                    <div className='mt-1 '>

                    </div>

                    <tbody >
                        <tr>
                            <td>Brand Management</td>
                        </tr>
                        <tr>
                            <td>Sales Development</td>
                        </tr>
                        <tr>
                            <td>Solution Selling</td>
                        </tr>
                        <tr>
                            <td>Sales Training</td>
                        </tr>
                        <tr>
                            <td>Google Ads </td>
                        </tr>
                    </tbody>

                    <div className="  " style={{ height: "104px" }}>
                    </div>
                </table>


                <table className='table  table-sm table-hover    '>
                    <thead> 
                        <tr>
                            <div className="mt-5     rounded-top " style={{ backgroundColor: "#F7FFDD", height: "36px" }}>
                                <div className='text h6 text-center   ' style={{ padding: "6px 0", color:  "#815F0B" }} >Active Recruiters</div>
                            </div>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Amazon</td>
                        </tr>
                        <tr>
                            <td>Google</td>
                        </tr>
                        <tr>
                            <td>Facebook</td>
                        </tr>
                        <tr>
                            <td>Microsoft</td>
                        </tr>

                    </tbody>
                </table>
            
        </>
    )
}

export default RightSideBar