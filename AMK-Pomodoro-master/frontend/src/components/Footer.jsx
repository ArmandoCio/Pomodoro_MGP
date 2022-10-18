import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";


export default function Footer() {
  return (
      <Box
        component="footer"
        sx={{
          py: 9,
          px: 3,
          background: "transparent",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h5" align="center">
            {"Copyright © "}
            W.I.P
            {" " + new Date().getFullYear()}
            {"."}
          </Typography>
        </Container>
      </Box>
   
  );
}
