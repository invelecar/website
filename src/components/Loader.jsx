import { MutatingDots } from "react-loader-spinner";

export const Loader = ({ visible }) => {
    return (
        <div className="position-absolute">
            <MutatingDots
                color="#007bff" 
                visible={visible}
                width={100}
                height={100}
                ariaLabel="mutating-dots-loading"
            />
        </div>
    );
}