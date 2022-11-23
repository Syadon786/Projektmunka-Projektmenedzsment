import React from 'react'
import Button from '../Button/Button';

const DynamicInput = ({fieldData, setFieldData}) => {

  const handleFormChange = (event, index) => {
      let data = [...fieldData];
      data[index] = event.target.value;
      setFieldData(data);
  }

  const removeField = (index) => {
    let data = [...fieldData];
    data.splice(index, 1);
    setFieldData(data);
  }

  const addField = () => {
      setFieldData([...fieldData, '']);
  }

  return (
    <div>
    {fieldData.map((field, index) => { return (
        <div key={index} className="input-group mt-2">
            <input className="form-control" placeholder="Add Subtask" 
            onChange={event => handleFormChange(event, index)}
            value={field}
            />
            <button  onClick={() => {
              removeField(index);
            }}><i className="bi bi-x-circle"></i></button>
        </div>
    )})}
      <div className="d-grid">
        <Button className="mt-2 btn-sm" onClick={addField}>Add</Button>
      </div>
    </div>
  )
}

export default DynamicInput