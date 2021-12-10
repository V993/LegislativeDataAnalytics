import React from "react"

function Information() {
    return (
		<div>
			{/*<Navigation/>*/}
			<div className="thin">
				<h1 className="center-header">
					The New York State Government
				</h1>
				<div className="">
					<div className="split">
						<h2 className="textBlock">
							Upper House Senate
						</h2>
						<h2 className="textBlock"> 			
							Lower House Assembly 
						</h2>
					</div>	
					<div className="middle">
						<p className="centeredText"> 
							The legislative branch consists of a bicameral (or two chamber) Legislature — a 63 member Senate and 150 member Assembly that, together, represent the 19 million citizens of the State.  All members are elected for two-year terms.
						</p>
						<p className="centeredText">
							The legislature’s main purpose is to draft and approve changes to the laws of New York. It also acts as a check upon the executive authority of the governor, being able to override the Governor’s veto during legislative deliberation. 
						</p>

						<p className="centeredText">
							The Legislature can approve a law despite a veto by the Governor with the support of two-thirds of the membership in each house. However, the most common lawmaking procedure is the result of compromise among the Senate, the Assembly and the Governor.
						</p>
					</div>
					<h2 className="middle"> 
						Elected Officers & Appointed Officials
					</h2>
					
					<p className="middle">
						Surprisingly, not many people living in New York know that their are only four 
						statewide goverment officers who are directly elected:
					</p>
					<li> <span> The Governor, who heads the Executive Department, and Lieutenant Governor (who are elected on a joint ballot). </span> </li>
					<li> <span> The State Comptroller, who heads the Department of Audit and Control. </span> </li> 
					<li> <span> The Attorney General, who heads the Department of Law. </span> </li>	
		
					<h2 className="middle">More information to come.</h2> 
				</div>
			</div>
			<br></br>
			<br></br>
			<br></br>
		</div>
    )
}

export default Information;
