import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useParams,
} from "react-router-dom";
import {
  Navbar,
  Footer,
  ScrollToTop,
  Presentation,
  MetaMaskWallet,
} from "./components/Components";
import {
  Home,
  NFTs,
  Rankings,
  Support,
  SignUp,
  LogIn,
  User,
  Member,
  NFTLab,
  Product,
} from "./pages/Pages";
import RawData from "./data/data.json";

function App() {
  const [data, setData] = useState(RawData);
  const HadelMemberPage = () => {
    const { useraddress } = useParams();
    //alert(userName);
    return <Member Data={data} useraddress={useraddress} />;
  };

  const HadelProductPage = () => {
    const { orc1155, id } = useParams();
    var d = <Product Data={data} orc1155={orc1155} id={id} />;
    return d;
  };

  return (
    <div className="app-container">
      <Router>
        
        <Navbar Data={data} setData={setData} />
        <ScrollToTop />
        <main>
          <Routes>
           <Route path="/" element={<Navigate to="/home" replace />} />
            
            <Route path="/home" element={<Home Data={data} />} />
            <Route
              path="/nfts"
              element={<NFTs Data={data.NFTsMarket} setData={setData} />}
            />
            <Route path="/rankings" element={<Rankings Data={data} />} />
            <Route path="/support" element={<Support />} />
            <Route
              path="/signup"
              element={
                !data.Access.haveaccess && data.Access.accountInfo.isUser =="false" ? (
                  <SignUp />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={
                !data.Access.haveaccess && !data.Access.accountInfo.isUser ? (
                  <LogIn Data={data.Access} setData={setData} />
                ) : (
                  data.Access.haveaccess && data.Access.accountInfo.isUser=="true" ? ( 
                    <Navigate to={'/user/'+data.Access.accountInfo.useraddress} replace /> 
                    ) : ( <Navigate to="/signup" replace /> 
                    )
                
                )

              }
            />
            <Route
              path="/account"
              element={
                data.Access.haveaccess && data.Access.accountInfo.isuser=="true" ? (
                  <Navigate to={'/user/'+data.Access.accountInfo.useraddress} replace />
                ) : (
                  <Navigate to="/signup" replace />
                )
              }
            />

            <Route
              path="/jkjkjkaccount1221/"
              element={
                data.Access.haveaccess ? (
                  <User Data={data} setData={setData} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            
            <Route path="/user/:useraddress" element={<HadelMemberPage />} />
            <Route path="/NFT/:orc1155/:id" element={<HadelProductPage />} />
            <Route
              path="/nftlab"
              element={
                data.Access.haveaccess ? (
                  <NFTLab Data={data} />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
