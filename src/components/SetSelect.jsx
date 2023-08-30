import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function SetSelect({onSetSelected, questionSets, autoSelectMode}) {
  const [set, setSet] = useState(questionSets[0].id);

  useEffect(() => {
    if (set && autoSelectMode) {
        handleSelected();
    }
}, [set]);

  function onChange(event){
    const { value } = event.target;
    setSet(value);
  }

  function handleSelected(){
    var selected = questionSets.find((x) => x.id == set);
    onSetSelected(selected);
  }

  return (
    <>
    {questionSets.length > 0 ? (
      <div className="grid grid-cols-12">
        <div className="col-span-12 justify-self-center">
          <select
              name={"Select set"}
              value={set}
              onChange={onChange}
              id="custom-select"
              className="mx-auto"
          >
              {questionSets &&
                  questionSets.map((s, i) => {
                      return (
                          <option key={i} value={s.id}>
                              {s.name}
                          </option>
                      );
                  })
              }
          </select>
        </div>
        {set && !autoSelectMode && (
          <div className="col-span-12 justify-self-center">
            <button onClick={handleSelected} className="px-8 py-2 bg-primary rounded-full text-4xl text-white">Select</button>
          </div>
        )}
        </div>

    ) : (
      <p>Loading sets</p>
    )}
    </>
  );
}

SetSelect.propTypes = {
  onSetSelected: PropTypes.func.isRequired,
  questionSets: PropTypes.array.isRequired,
  autoSelectMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
      questionSets: state.game.configuration.questionSets
  };
};

export default connect(mapStateToProps)(SetSelect);
