import { Box } from "@mui/material"
import AddSearchbar from "./AddSearchbar"


const WorldMap = ({onSearch}) => {
  return (
    
    <Box
    sx={{
         position: "relative",
        width: "100%",
        height: {
          xs: 300,
          md: 500,
        },
        backgroundImage: "url('/world-map.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#071b30",
        border: "1px solid #19364e",
        borderRadius: 2,
        overflow: "hidden",
    }}
    >
        
        <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(2,15,31,0.1), rgba(2,15,31,0.4))",
        }}
      />

      <Box
      sx={{
        position: "absolute",
        top: 16,
        left: 16,
        zIndex: 2,
        width: "calc(100% - 32px)",
        maxWidth: 350
      }}
      >
        <AddSearchbar onSearch={onSearch}/>
      </Box>
     
    </Box>
  )
}

export default WorldMap
