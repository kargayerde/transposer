const styles = {
	noteBox: {
		border: "1px solid darkgrey",
		width: "36px",
		height: "36px",
		marginLeft: "1px",
		marginBottom: "1px",
		fontSize: "24px",
		
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	noteRow: {
		display: "flex",
		flexDirection: "row",
	},
	arrow: {
		fontSize: "24px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "grey",
		zIndex: 10000,
		position: "absolute",
		top: "20px",
	},
};

export const NoteDisplay = ({ transposeAmount, noteDictionary }) => {
	const shiftedNotes = noteDictionary
		.slice(transposeAmount)
		.concat(noteDictionary.slice(0, transposeAmount));

	const drawArrows = () => {
		return [...Array(12).keys()].map((ind) => {
			console.log({ind: (ind * 2) + "px"})
			return <div key={ind} style={{ ...styles.arrow, left: ((ind * 37) + 12) + "px" }}>▼</div>;
		});
	};

	return (
		<div style={{ position: "absolute", bottom: "5px", left: "5px" }}>
			<div style={{ position: "relative"}}>
				{drawArrows()}
				<div style={styles.noteRow}>
					{noteDictionary.map((item) => (
						<div style={{ ...styles.noteBox, backgroundColor: "papayawhip" }}>
							{item}
						</div>
					))}
				</div>
				<div style={styles.noteRow}>
					{shiftedNotes.map((item) => (
						<div style={{ ...styles.noteBox, backgroundColor: "lightcyan" }}>
							{item}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
