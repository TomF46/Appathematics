import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import SetSelect from "../components/SetSelect";

function Home() {
    const navigate = useNavigate();

    function handleSetSelected(set){
        navigate(`/games/${set.id}/play`);
    }

    return (
        <>
            <img src={logo} className="mx-auto mt-4 logo" />
            <div className="text-center text-primary">
                <h2 className="text-4xl">Welcome to Appathematics</h2>
                <p className="text-lg">
                    Choose your level from the drop down below and click the
                    start button to begin
                </p>
                <p className="text-lg">
                    The higher the number of questions the harder the possible
                    questions become
                </p>
            </div>
            <SetSelect onSetSelected={handleSetSelected} />
        </>
    );
}

export default Home;
