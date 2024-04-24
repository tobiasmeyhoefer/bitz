import { auth } from "@/auth";

const ProtectedPage = async () => {
  const session = await auth()

  if(!session) {
    return(
      <h1>not allowed</h1>
    )
  }
  
  return ( 
    <h1>allowed</h1>
  );
}
 
export default ProtectedPage;