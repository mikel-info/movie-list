import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import logo from "../../assets/img/logo1.jpg";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faList, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	navbar: { backgroundColor: "#252627" },
	logo: {
		width: "100%",
		marginTop: "2px",
		cursor: "pointer",
	},
	navCategory: {
		flexGrow: 1,
		display: "flex",
		marginLeft: "3%",
	},
}));

function Navbar() {
	const classes = useStyles();
	const navigate = useNavigate();

	function clickMovieList() {
		navigate("/");
	}

	return (
		<Container maxWidth="xl" className={classes.navbar}>
			<Toolbar disableGutters>
				<div style={{ width: "120px" }}>
					<img
						src={logo}
						alt="logo"
						className={classes.logo}
						onClick={clickMovieList}
					/>
				</div>

				<Box className={classes.navCategory}>
					<Button
						onClick={clickMovieList}
						sx={{ my: 2, color: "white", display: "block" }}
					>
						<FontAwesomeIcon icon={faList} style={{ paddingRight: "5px" }} />
						Movie List
					</Button>
					<Button sx={{ my: 2, color: "white", display: "block" }}>
						<FontAwesomeIcon icon={faFire} style={{ paddingRight: "5px" }} />
						Popular
					</Button>
					<Button sx={{ my: 2, color: "white", display: "block" }}>
						<FontAwesomeIcon icon={faStar} style={{ paddingRight: "5px" }} />
						Top Rated
					</Button>
				</Box>
			</Toolbar>
		</Container>
	);
}
export default Navbar;
