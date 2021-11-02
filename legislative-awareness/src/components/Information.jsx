import React from "react"
import {Link, withRouter } from "react-router-dom";


function Information() {
    return (
        <div className="information">
            <div class="container">
                <div class="row align-items-center my-5">
                        <h1 class="font-weight-light">
                            Welcome to the Information Page!
                        </h1>

			<p class="row align-items-left my-4"> 			
				This product aims to make educating oneself about the goings-on in 	
				government a <Link class="nav-link" to="/"> click away! </Link> Whether that involves 
				knowing who your representatives are, or what your government is
 				up to. 
			</p>
                  
			 <h2 class="font-weight-light">
			    	Transparency through Centralized Information
			 </h2>

			 <p class="row align-items-left my-3"> 
			 	As a representative democracy, the U.S. is relatively transparent
				with its legislative decision-making but this data is massive and 
				difficult to understand without a good amount of time for research. 
			 	That is where we come in!
			 </p>
	
			<h2 class="font-weight-light">
				Our Motivation for the Page!
			</h2>

			<p class="row align-items-left my-4">
				After speaking with lobbyist for city hall about the complexity of 
				all this readily-available data, we decided that the best way to represent 
				it all is through data manipulation and analytics! 
			</p>
			
			<h2 class="font-weight-light"> 
				Elected Officers & Appointed Officials
			</h2>
			
			<p class="row align-items-left my-4">
				Surprisingly, not many people living in New York know that their are only four 
				statewide goverment officers who are directly elected:
			</p>
				<li> <span> The Governor, who heads the Executive Department, and Lieutenant Governor (who are elected on a joint ballot). </span> </li>
				<li> <span> The State Comptroller, who heads the Department of Audit and Control. </span> </li> 
				<li> <span> The Attorney General, who heads the Department of Law. </span> </li>
			</div>		
		</div>
	</div>
		
    )
}

export default Information;
