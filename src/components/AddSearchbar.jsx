import { TextField, Button, Box } from "@mui/material"
import { useState } from "react"

const AddSearchbar = ({onSearch}) => {

  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchInput);
    
  }
  return (
      <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        padding: 1,
        backgroundColor: "rgba(7, 27, 48, 0.9)",
        border: "1px solid #29445b",
        borderRadius: 2,
      }}
      >
        <TextField fullWidth size="small" placeholder="Search any country" value={searchInput} onChange={(event) => setSearchInput(event.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
            backgroundColor: "#10263b",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#29445b",
          },
        }}    
        ></TextField>
        <Button variant="contained"type="submit"
        sx={{
          backgroundColor: "#20a99e",
          textTransform: "none",
          height: 40,
        }}
        >Search</Button>
</Box>
  )
}

export default AddSearchbar
