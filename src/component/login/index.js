export default function Login({setLoggedIn}){
    return <>
    <div>
        <button onClick={()=>{
            setLoggedIn(true);
        }}>Login</button>
    </div>
    </>
}