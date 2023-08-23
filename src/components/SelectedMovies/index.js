import * as React from "react";
import axios from "axios";
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	Avatar,
	IconButton,
	Typography,
	Grid,
	CardActions,
	Collapse,
	Box,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import noImage from "../../assets/img/noImage.jpg";
import {
	faAward,
	faClapperboard,
	faClock,
	faEarthEurope,
	faFilePen,
	faStarHalfStroke,
	faStreetView,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { capitalizeFirstLetter } from "../../helpers/stringManipulations";

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
	transition: theme.transitions.create("transform", {
		duration: theme.transitions.duration.shortest,
	}),
}));

const useStyles = makeStyles((theme) => ({
	center: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "70vh",
	},
	containerMovie: {
		justifyContent: "center",
		paddingTop: "2%",
	},
	noDataText: {
		fontFamily: "Lucida Console, Monaco, monospace",
		fontSize: "21px",
		letterSpacing: "0.6px",
		wordSpacing: "0px",
		color: "#000000",
		fontWeight: 700,
		alignItems: "center",
	},
	text: {
		fontSize: 16,
	},
	image: {
		objectFit: "none !important",
	},
}));

function SelectedMovies() {
	const classes = useStyles();
	const params = useParams();

	const [movieDetails, setMovieDetails] = React.useState([]);
	const [expanded, setExpanded] = React.useState(false);

	const getDetailsMovies = (movieId) => {
		axios
			.get(`https://www.omdbapi.com/?i=${movieId}&apikey=24f7d215`)
			.then((res) => {
				if (res.data.Response !== "True") {
					return setMovieDetails([]);
				}
				setMovieDetails([res.data]);
			})
			.catch((error) => console.log(error));
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	React.useEffect(() => {
		if (params.id) getDetailsMovies(params.id);
	}, [params.id]);

	return movieDetails.length === 0 ? (
		<Box className={classes.center}>
			<CircularProgress />
		</Box>
	) : (
		<Grid container spacing={2} className={classes.containerMovie}>
			{movieDetails?.map((item) => (
				<Card
					key={item.imdbID}
					sx={{ maxWidth: 600 }}
					style={{ boxShadow: "5px 7px 15px -3px #000000" }}
				>
					<CardHeader
						avatar={
							<Avatar
								sx={{ bgcolor: red[500] }}
								aria-label="recipe"
								title={item.Title}
							>
								{item.imdbRating}
							</Avatar>
						}
						title={item.Title}
						subheader={`Released date: ${item.Released}`}
					/>
					<CardMedia
						component="img"
						height="350"
						image={item.Poster === "N/A" ? noImage : item.Poster}
						alt={item.Title}
						classes={{ img: classes.image }}
					/>
					<CardContent style={{ paddingBottom: 0 }}>
						<Typography variant="body2" color="text.secondary">
							{item.Plot}
						</Typography>
					</CardContent>
					<CardActions disableSpacing>
						<ExpandMore
							expand={expanded}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label="show more"
						>
							<ExpandMoreIcon />
						</ExpandMore>
					</CardActions>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph>
								<FontAwesomeIcon icon={faClock} /> Runtime: {item.Runtime}
							</Typography>
							<Typography paragraph>
								<FontAwesomeIcon icon={faClapperboard} /> Genre: {item.Genre}
							</Typography>
							<Typography paragraph>
								<FontAwesomeIcon icon={faEarthEurope} /> Country: {item.Country}
							</Typography>
							<Typography paragraph>
								<FontAwesomeIcon icon={faStreetView} /> Director:{" "}
								{item.Director}
							</Typography>
							<Typography paragraph>
								<FontAwesomeIcon icon={faFilePen} /> Writer: {item.Writer}
							</Typography>
							<Typography paragraph>
								<FontAwesomeIcon icon={faUsers} /> Actors: {item.Actors}
							</Typography>
							<Typography paragraph>
								<FontAwesomeIcon icon={faAward} /> Awards:{" "}
								{item.Awards === "N/A" ? "-" : item.Awards}
							</Typography>
							<Typography paragraph>
								<FontAwesomeIcon icon={faStarHalfStroke} /> Ratings:{" "}
								{item.Ratings.length === 0 ? "-" : item.Ratings[0].Value}
							</Typography>
							<Typography paragraph>
								<FontAwesomeIcon icon={faClapperboard} /> Votes:{" "}
								{item.imdbVotes}
							</Typography>
							<Typography paragraph>
								<FontAwesomeIcon icon={faClapperboard} /> Type:{" "}
								{capitalizeFirstLetter(item.Type)}
							</Typography>
						</CardContent>
					</Collapse>
				</Card>
			))}
		</Grid>
	);
}

export default SelectedMovies;
