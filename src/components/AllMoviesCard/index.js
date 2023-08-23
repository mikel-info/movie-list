import * as React from "react";
import { Card, CardHeader, CardMedia, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import noImage from "../../assets/img/noImage.jpg";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter } from "../../helpers/stringManipulations";

const useStyles = makeStyles((theme) => ({
	containerMovie: {
		justifyContent: "center",
		paddingTop: "2%",
		height: "70vh",
	},
	text: {
		fontFamily: "Lucida Console, Monaco, monospace",
		fontSize: "21px",
		letterSpacing: "0.6px",
		wordSpacing: "0px",
		color: "#000000",
		fontWeight: 700,
		alignItems: "center",
	},
}));

function MoviesCard(props) {
	const { dataMovieList } = props;

	const classes = useStyles();
	const navigate = useNavigate();

	function linkNameMovie(movieId) {
		navigate(`/movie/${movieId}`);
	}

	return (
		<Grid container spacing={2} className={classes.containerMovie}>
			{dataMovieList.length === 0 && (
				<Grid style={{ display: "flex", alignItems: " center" }}>
					<p className={classes.text}>
						No movie <FontAwesomeIcon icon={faFaceFrown} />, Try another one
					</p>
				</Grid>
			)}
			{dataMovieList?.map((item) => (
				<Grid item key={item.imdbID} style={{ padding: "2px 25px" }}>
					<Card
						sx={{ maxWidth: 350 }}
						style={{
							boxShadow: "5px 7px 15px -3px #000000",
							cursor: "pointer",
						}}
						onClick={() => {
							linkNameMovie(item.imdbID);
						}}
					>
						<CardHeader
							titleTypographyProps={{
								fontSize: 15,
								fontWeight: 700,
							}}
							subheaderTypographyProps={{
								fontSize: 16,
								fontFamily: "math",
							}}
							title={item.Title}
							subheader={`Category: ${capitalizeFirstLetter(item.Type)}, ${
								item.Year
							}`}
						/>
						<CardMedia
							component="img"
							height={370}
							width={370}
							image={item.Poster === "N/A" ? noImage : item.Poster}
							alt={item.Title}
						/>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}

export default MoviesCard;
