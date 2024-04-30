// 컴포넌트 import
// import RegisterOnestep from "../../components/shop/RegisterOnestep.tsx"
// import RegisterTwostep from "../../components/shop/RegisterTwostep.tsx";
import RegisterThreestep from "../../components/shop/RegisterThreestep.tsx";

const RegisterShopPage = () => {
    return (
        <div className="fixed flex flex-col items-center w-full h-full top-[60px] gap-2">
            {/* <RegisterOnestep />
            <RegisterTwostep /> */}
            <RegisterThreestep />
            
        </div>
    );
};

export default RegisterShopPage;