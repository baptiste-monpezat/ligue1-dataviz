import * as React from "react";
import { useQuery, gql } from "@apollo/client";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import AppBar from "../components/AppBar";
import Bump from "../components/Bump";

const SEASONS = gql`
  query dates {
    dates
  }
`;

export default function ClientSide() {
  const [season, setSeason] = React.useState("2021-2022");

  const { data, loading, error } = useQuery(SEASONS, {
    variables: {},
  });

  const handleChange = (event) => {
    setSeason(event.target.value);
  };

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <>
      {!loading && (
        <>
          <AppBar />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Saison</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={season}
                label="Saison"
                onChange={handleChange}
              >
                {data.dates.map((season) => (
                  <MenuItem key={season} value={season}>
                    {season}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Bump season={season} />
        </>
      )}
    </>
  );
}
