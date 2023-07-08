import React from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { HeatmapsPage } from "./pages/heatmaps";

function App() {
  return (
    <Box className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h1"
            noWrap
            component="div"
            sx={{ fontSize: 20, flexGrow: 1 }}
          >
            Developer Assessment
          </Typography>
          <Box>
            <Typography
              variant="overline"
              component="span"
              sx={{ marginRight: 3 }}
            >
              Data Source:
            </Typography>
            <Button variant="contained" size="small">
              Versions
            </Button>
            <Button size="small" disabled sx={{ margin: "0 15px" }}>
              Products
            </Button>
            <Button size="small" disabled>
              Regions
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingTop: 3 }} maxWidth="xl">
        <HeatmapsPage />
      </Container>
    </Box>
  );
}

export default App;
