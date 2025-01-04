import { useNavigate } from "react-router-dom";

import "./NavigateBackButton.css";

const NavigateBackButton = () => {
	const navigate = useNavigate();

	return (
		<button className="back-button" onClick={() => navigate(-1)}>
			Go back
		</button>
	);
};

export default NavigateBackButton;
