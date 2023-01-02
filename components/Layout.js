import NavBar from "./NavBar"

const Layout = ({children}) => {
    return (
        <div className="flex">
            <NavBar/>
            {children}
        </div>
    )
}

export default Layout