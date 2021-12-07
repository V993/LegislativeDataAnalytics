// import "./style.css";
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div>
      <header>
        <Link to="/" className="link">
          <h1>New York Legislative Awareness</h1>
        </Link>
      </header>
      <div className="split">
        <br></br>
        {/* <div className="textBlock">
          <h3 className="underline">What we are:</h3>
          Legislative Awareness is a project dedicated to making
          readily-available government resources more digestible to the average
          consituent. It is a tool, compiling multiple sources of government
          data in one, easy to use, comprehensive web application. Below are
          options to view data, find your local representatives, and learn about
          the way government is structured in New York State.
        </div>
        <div className="textBlock">
          <h3 className="underline">What comes next:</h3>
          <li>
            More data is on the way. We plan to add NY State Senate and NY State
            Assembly databases.{" "}
          </li>
          <li>
            More charts. Additional charts based on representative information.
          </li>
          <li>
            Deeper dives into NY databases. We plan on plotting more information
            and increasing the capabilities of users to interact with the data
            we have in our database.
          </li>
          <li>
            Interaction with representatives and discourse, as well as user
            accounts.
          </li>
        </div> */}
      </div>
    </div>
  );
}
