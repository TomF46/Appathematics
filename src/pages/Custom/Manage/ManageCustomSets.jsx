import { Link} from "react-router-dom";
import { getCustomSets } from "../../../services/customSetsService";

function ManageCustomSets() {
    const sets = getCustomSets();

    return (
        <div>
            <h1 className="text-4xl my-4 text-primary text-center">Sets</h1>
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
        </div>
    );
}

export default ManageCustomSets;
