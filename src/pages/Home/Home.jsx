import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import SetSelect from "../../components/SetSelect";

function Home() {
    const navigate = useNavigate();

    function handleSetSelected(set){
        navigate(`/games/${set.id}/play`);
    }

    return (
        <>
            <img src={logo} className="mx-auto mt-4 logo" alt="Appathematics logo" />
            <div className="text-center text-primary">
                <h2 className="text-2xl md:text-4xl mb-4">Welcome to Appathematics</h2>
                <p className="text-base md:text-lg">
                    Choose your level from the drop down below and click the
                    start button to begin
                </p>
                <p className="text-base md:text-lg">
                    The higher the number of questions the harder the possible
                    questions become
                </p>
            </div>
            <SetSelect onSetSelected={handleSetSelected} autoSelectMode={false}/>
            <div className="text-center my-4">
                <Link className="text-primary text-center underline" to={"/leaderboards"}>View leaderboards</Link>
            </div>
        </>
    );
}

export default Home;
