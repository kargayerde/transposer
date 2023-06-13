import { NoteDisplay } from "./noteDisplay";

import { useState } from "react";

const styles = {
	box: { boxShadow: "0px 0px 10px 1px #CCCCCC", borderRadius: "20px", padding: "10px" },
};

function App() {
	const noteDictionary = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"];
	const noteIndices = {
		"A#": 1,
		Bb: 1,
		"C#": 4,
		Db: 4,
		"D#": 6,
		Eb: 6,
		"F#": 9,
		Gb: 9,
		"G#": 11,
		Ab: 11,
		A: 0,
		B: 2,
		C: 3,
		D: 5,
		E: 7,
		F: 8,
		G: 10,
	};
	const suffixDictionary = [
		" ",
		"\n",
		"\\*",
		"\\|",
		"\\.",
		"m",
		"7",
		"M7",
		"maj7",
		"mmaj7",
		"sus2",
		"sus4",
	];
	const intervalDictionary = [
		"Unison",
		"m2",
		"M2",
		"m3",
		"M3",
		"P4",
		"dim5",
		"P5",
		"m6",
		"M6",
		"m7",
		"M7",
	];

	const [inputText, setInputText] = useState("");
	const [transposeAmount, setTransposeAmount] = useState(0);

	const transpose = (inputText, amount) => {
		let transposed = inputText;
		let suffixes = [];

		Object.keys(noteIndices).forEach((note) => {
			let transposedNoteIndex = noteIndices[note] + Number(amount);
			if (transposedNoteIndex < 0) transposedNoteIndex += 12;
			if (transposedNoteIndex >= 12) transposedNoteIndex -= 12;

			suffixDictionary.forEach((suffix) => {
				const re = new RegExp(note + suffix, "g");
				const outSuffix = suffix.slice(0, 1) === "\\" ? suffix.slice(1) : suffix;
				transposed = transposed.replace(
					re,
					"%%" + String(transposedNoteIndex).padStart(2, "0") + outSuffix
				);
			});
		});

		transposed = transposed.split("%%").map((item, index) => {
			if (index === 0) return item;
			let noteIndex = Number(item.slice(0, 2));
			console.log({ noteIndex, lolo: noteDictionary[noteIndex] + item.slice(2) });
			const transposedNote = noteDictionary[noteIndex];
			return (
				<span>
					<span style={{ color: "purple", fontWeight: "bold", margin: "0px" }}>
						{transposedNote}
					</span>
					{item.slice(2)}
				</span>
			);
		});
		// .join("");

		return transposed;
	};

	return (
		<div className="App" style={{ height: "100%", overflow: "auto" }}>
			<div
				className="main-container"
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					padding: "10px",
					position: "relative",
					backgroundColor: "#F0E8DD",
				}}
			>
				<NoteDisplay transposeAmount={transposeAmount} noteDictionary={noteDictionary} />
				<div
					className="input-container"
					style={{
						display: "flex",
						flexDirection: "column",
						marginRight: "10px",
						position: "absolute",
						left: "10px",
						top: "10px",
						padding: "4px",
					}}
				>
					<input
						type="range"
						min="-11"
						max="11"
						value={transposeAmount}
						onChange={(e) => setTransposeAmount(e.target.value)}
						style={{ maxWidth: "400px" }}
					/>

					<span>{`transpose: ${(transposeAmount > 0 ? "+" : "") + transposeAmount} (${
						intervalDictionary[Math.abs(transposeAmount)]
					})\n\n`}</span>

					<textarea
						onChange={(e) => setInputText(e.target.value)}
						onClick={(e) => e.target.select()}
						placeholder="Paste chords here"
						style={{
							minWidth: "300px",
							minHeight: "100px",
							height: "500px",
							border: "none",
							marginTop: "10px",
							...styles.box,
						}}
					></textarea>
				</div>

				{/* <div className="output-container" style={{position: "relative"}}> */}
				<div
					// value={transpose(inputText, transposeAmount)}
					// readOnly={true}
					style={{
						minWidth: "30%",
						minHeight: "500px",
						height: "100%",
						width: "max-content",
						backgroundColor: "whitesmoke",
						whiteSpace: "pre-wrap",
						padding: "10px",
						overflow: "auto",
						...styles.box,
					}}
				>
					{transpose(inputText, transposeAmount)}
				</div>
			</div>
		</div>
	);
}

export default App;
