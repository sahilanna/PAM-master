import React, {useState, useEffect} from 'react';
// import AdminDashboard from '../../components/DashboardHeader';
import './Home.css' 
// import all_proj from '../../constants/orders';
// import {calculateRange, sliceData} from '../../utils/table-pagination';




function Projects () {
    return(

        <div className='dashboard-content'>
            {/* <AdminDashboard btnText="New Order" /> */}

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                </div>

                <table className='tab'>
                    <thead>
                        <th>ID</th>
                        <th>PROJECT</th>
                        
                    </thead>
                </table>
 
                    
            </div>
        </div>
       
        
    );
}

export default Projects;