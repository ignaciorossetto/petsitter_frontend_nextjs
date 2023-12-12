import Image from "next/image"

const Svg = () => {
  return (
    <div>
      <h1>SVG Image Example</h1>
      <Image
        src="/prados.svg" // Path from the public folder
        alt="Example SVG"
        width={3000} // Set the desired width
        height={3000} // Set the desired height
      />
    </div>
  )
}

export default Svg