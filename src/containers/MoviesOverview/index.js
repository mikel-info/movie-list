import React from "react";
import axios from "axios";
import AllMoviesCard from "../../components/AllMoviesCard";
import { Grid, Container, TextField, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
	center: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "70vh",
	},
	containerMovie: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: "2%",
		height: "70vh",
	},
	div: {
		marginTop: "2%",
	},
	text: {
		fontFamily: "Lucida Console, Monaco, monospace",
		fontSize: "21px",
		letterSpacing: "0.6px",
		wordSpacing: "0px",
		color: "#000000",
		fontWeight: 700,
	},
}));

function MoviesOverview() {
	const classes = useStyles();

	const [search, setSearch] = React.useState("");
	const [dataMovieList, setDataMovieList] = React.useState([]);

	const getData = (search) => {
		axios
			.get(`https://www.omdbapi.com/?s=${search}&apikey=24f7d215`)
			.then((res) => {
				if (res.data.Response !== "True") {
					return setDataMovieList([]);
				}
				setDataMovieList(res.data.Search.slice(0, 3));
			})
			.catch((error) => console.log(error));
	};

	const handleSearch = (event) => {
		setSearch(event.target.value);
	};

	React.useEffect(() => {
		if (search) {
			getData(search);
		} else {
			return setDataMovieList([]);
		}
	}, [search]);

	return (
		<>
			<Container>
				<Grid container className={classes.div}>
					<Grid item xs={9}></Grid>
					<Grid item xs={3}>
						<TextField
							id="input-with-icon-textfield"
							label="Search"
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
							variant="standard"
							value={search}
							onChange={handleSearch}
						/>
					</Grid>
				</Grid>
			</Container>
			{search.length < 3 ? (
				<Grid className={classes.containerMovie}>
					<p className={classes.text}>
						Search for movie title <FontAwesomeIcon icon={faKeyboard} />
					</p>
				</Grid>
			) : (
				<AllMoviesCard dataMovieList={dataMovieList} />
			)}
		</>
	);
}

export default MoviesOverview;
