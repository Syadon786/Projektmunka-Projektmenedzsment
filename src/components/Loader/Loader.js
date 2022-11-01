const Loader = ({color = "primary", display}) => {
    const LoaderConfig = {
        primary: "text-primary",
        secondary: "text-secondary",
        light: "text-light",
        dark: "text-dark",
      }

    return (
      display ? 
      <div className="d-flex justify-content-center">
          <div className={`spinner-border ${LoaderConfig[color]}`} role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
      </div>
      : <></>
    )
  }
  
  export default Loader