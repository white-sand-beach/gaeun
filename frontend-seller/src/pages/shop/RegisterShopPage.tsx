// 컴포넌트 import
import RegisterOnestep from "../../components/shop/RegisterOnestep.tsx"

const RegisterShopPage = () => {
    return (
        <div className="flex flex-col items-center gap-3">
            <RegisterOnestep />
            <button className="mt-2 common-btn">다음</button>
        </div>
    );
};

export default RegisterShopPage;