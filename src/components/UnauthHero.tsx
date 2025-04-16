import Link from "next/link";

const UnauthHero =()=>{
return(
    <section
    style={{
      backgroundImage:
        'url("https://images.unsplash.com/photo-1552985190-626af207368d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', // استبدل هذا بالرابط الذي تريد استخدامه
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      color: "black",
      paddingLeft: "130px",
    }}
  >
    <div className="text-left">
      <h1 className="text-[60px] font-bold">Human stories & ideas</h1>
      <p className="mt-2">
        A place to read, write, and deepen your understanding
      </p>

      <button className="text-white mt-8  bg-[#bd88c9] py-2  px-4 rounded-md ">
        {" "}
        <Link href="/login"> Get started</Link>
      </button>
    </div>
  </section>
)
}
export default UnauthHero;