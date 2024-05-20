//models
import { TokenViewModel } from "./models/viewModels/TokenViewModel";
import { Roles } from "./enums/Roles";
//helpers
import { getCookie } from "./utils/Cookie";
import { jwtDecode } from "jwt-decode";
//components
import RouterManager from "./routers/RouterManager";

function App() {
  let userRole: Roles = Roles.Guest

  const token = getCookie("jwt")

  if (token) {
    const decodedToken = jwtDecode<TokenViewModel>(token);

    userRole = Roles[decodedToken.role as keyof typeof Roles]
  }

  return (
    <>
      <RouterManager userRole={userRole}></RouterManager>
    </>
  );
}

export default App;