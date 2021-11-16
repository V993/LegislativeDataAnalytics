import { Link } from 'react-router-dom'

export const NotFound = () => {
    return (
        <html id="center">
            <img src="404NotFound.jpg" alt="even the image was not found yo"/>

            <div id="smolButton">
                <Link to="/" className="smolButton">
                    Back to Home
                </Link>
            </div>
        </html>
    )
}