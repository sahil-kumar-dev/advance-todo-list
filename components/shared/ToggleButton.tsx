import React from "react";
import "./ToggleButton.css";

const defaultOptions = {
	invertedIconLogic: false,
};

const ToggleButton = ({
	isDark,
	onChange,
	invertedIconLogic = defaultOptions.invertedIconLogic,
}: {
	isDark: boolean;
	onChange: () => void;
	invertedIconLogic?: boolean;
}) => (
	<label
		className={"container"}
		title={isDark ? "Activate light mode" : "Activate dark mode"}
		aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
	>
		<input
			type="checkbox"
			defaultChecked={invertedIconLogic ? !isDark : isDark}
			onChange={onChange}
		/>
		<div />
	</label>
);

export default ToggleButton;
