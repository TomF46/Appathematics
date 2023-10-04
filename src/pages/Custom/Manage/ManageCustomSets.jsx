import { Link} from "react-router-dom";
import { getCustomSets } from "../../../services/customSetsService";

function ManageCustomSets() {
    const sets = getCustomSets();

    return (
        <div>
            <h1 className="text-4xl my-4 text-primary text-center">Sets</h1>
            <div className="text-center my-8">
                <Link className="px-8 py-2 bg-primary rounded-full text-xl text-white" to={"/custom/manage"}>Add new question set</Link>
            </div>
            {sets.length > 0 ? (
                <table className="table-auto w-full p-1 text-center border border-primary" role="leaderboard">
                    <thead className="bg-primary">
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sets.map((set) => {
                            return (
                                <tr key={set.id}>
                                    <td>{set.name}</td>
                                    <td><Link to={`/custom/${set.id}/manage`}>Manage</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
            </table>
            ) : (
                <p className="text-center text-primary text-lg mt-8">No custom game sets have been added. Once you create one this will be listed and can be managed below.</p>
            )}
        </div>
    );
}

export default ManageCustomSets;
