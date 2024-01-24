const DivCenter = (props) => {
  return (
    <div className={`relative w-full h-screen ${props.mainDiv}`}>
        <div className={`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute ${props.className}`}>
            {props.children}
        </div>
    </div>
  )
}

export default DivCenter