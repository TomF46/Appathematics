import { Link } from 'react-router-dom';
import {
  getCustomSets,
  getDefaultSets,
  handleSetDelete,
} from '../../../services/customSetsService';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { useDispatch } from 'react-redux';
import gameActions from '../../../redux/actions/gameActions';
import { useState } from 'react';

function ManageCustomSets() {
  const dispatch = useDispatch();
  const [sets, setSets] = useState(getCustomSets());

  function handleDelete(set) {
    confirmAlert({
      title: 'Confirm delete',
      message: `Are you sure to delete "${set.name}".`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteSet(set),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  }

  async function deleteSet(set) {
    let sets = await handleSetDelete(set);
    const defaultSets = getDefaultSets();
    const totalSets = defaultSets.concat(sets);
    dispatch(gameActions.setConfiguration({ questionSets: totalSets }));
    setSets(getCustomSets());
  }

  return (
    <div>
      <h1 className='text-4xl my-4 text-primary text-center'>Sets</h1>
      <div className='text-center my-8'>
        <Link
          className='px-8 py-2 bg-primary rounded-full text-xl text-white'
          to={'/custom/manage'}
        >
          Add new question set
        </Link>
      </div>
      {sets.length > 0 ? (
        <table
          className='table-auto w-full p-1 text-center border border-primary'
          role='leaderboard'
        >
          <thead className='bg-primary'>
            <tr>
              <th>Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sets.map((set) => {
              return (
                <tr key={set.id}>
                  <td className='text-lg'>{set.name}</td>
                  <td>
                    <Link
                      to={`/custom/${set.id}/manage`}
                      className='px-4 py-1 bg-primary rounded-full text-lg text-white'
                    >
                      Manage
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        handleDelete(set);
                      }}
                      className='px-4 py-1 rounded-full text-lg bg-red-800 text-white read-text'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className='text-center text-primary text-lg mt-8'>
          No custom game sets have been added. Once you create one this will be listed and can be
          managed below.
        </p>
      )}
    </div>
  );
}

export default ManageCustomSets;
