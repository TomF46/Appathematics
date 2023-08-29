import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import configuration from "../configuration.json";

function SetSelect({onSetSelected}) {
  const sets = configuration.questionSets;
  const [set, setSet] = useState(null);

  function onChange(event){
    const { value } = event.target;
    setSet(value);
  }

  function handleSelected(){
    var selected = sets.find((x) => x.id == set);
    onSetSelected(selected);
  }

  return (
    <>
    {sets.length > 0 ? (
      <>
      <div className="field">
            <label
                className="block mb-1 font-bold text-xs text-primary"
                htmlFor={name}
            >
                Set select
            </label>
            <div className="relative">
                <select
                    name={"Select set"}
                    value={set}
                    onChange={onChange}
                    className="block appearance-none focus:outline-none focus:border-primary text-primary w-full bg-backgroundOffset2 border border-gray-500 hover:border-gray-500 p-2 pr-8 leading-tight focus:outline-none focus:outline rounded"
                >
                    <option value={null} >Select a set</option>
                    {sets &&
                        sets.map((s, i) => {
                            return (
                                <option key={i} value={s.id}>
                                    {s.name}
                                </option>
                            );
                        })
                    }
                </select>
            </div>
        </div>
        {set && (
          <button onClick={handleSelected} className="px-4 py-2 bg-primary rounded">Select</button>
        )}
        </>

    ) : (
      <p>Loading sets</p>
    )}
    </>
  );
}

SetSelect.propTypes = {
  onSetSelected: PropTypes.func.isRequired,
  loadConfiguration: PropTypes.func.isRequired
};

const mapStateToProps = () => {
  return {
    
  };
};

export default connect(mapStateToProps)(SetSelect);
