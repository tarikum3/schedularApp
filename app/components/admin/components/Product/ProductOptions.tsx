import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

interface ProductOptionProps {
  name?: string;
  values?: string[];
  onUpdate: (updated: { name: string; values: string[] }) => void;
}

const ProductOption: React.FC<ProductOptionProps> = ({
  name = "",
  values = [],
  onUpdate,
}) => {
  const [optionName, setOptionName] = useState(name);
  const [valueInput, setValueInput] = useState("");
  const [valueList, setValueList] = useState<string[]>(values);
  const [error, setError] = useState("");

  const handleUpdate = useCallback(() => {
    onUpdate({ name: optionName, values: valueList });
  }, [optionName, valueList]);

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate]);

  const handleAddValue = () => {
    if (valueInput.trim() !== "" && !valueList.includes(valueInput.trim())) {
      setValueList((prev) => [...prev, valueInput.trim()]);
      setValueInput("");
    }
  };

  const handleDeleteValue = (value: string) => {
    setValueList((prev) => prev.filter((v) => v !== value));
  };

  const handleDone = () => {
    if (optionName.trim() === "" || valueList.length === 0) {
      setError("Option name and values cannot be empty.");
      return;
    }
    setError("");
    alert(`Submitted Option: ${optionName}, Values: ${valueList.join(", ")}`);
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md">
      {/* TextField for Option Name */}
      <TextField
        label="Option Name"
        variant="outlined"
        fullWidth
        value={optionName}
        onChange={(e) => setOptionName(e.target.value)}
      />

      {/* Input for Adding Values */}
      <div className="flex items-center space-x-2">
        <TextField
          label="Add Values"
          variant="outlined"
          placeholder="Add values"
          fullWidth
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
        <IconButton color="primary" onClick={handleAddValue}>
          <AddIcon />
        </IconButton>
      </div>

      {/* List of Values */}
      <List>
        {valueList.map((value, index) => (
          <ListItem key={index} divider>
            <ListItemText primary={value} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDeleteValue(value)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Validation Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Done Button */}
      <div className="flex justify-end">
        <Button variant="contained" color="primary" onClick={handleDone}>
          Done
        </Button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [optionData, setOptionData] = useState({
    name: "Sample Option",
    values: ["Value 1", "Value 2"],
  });

  const handleUpdate = (updated: { name: string; values: string[] }) => {
    console.log("Updated Data:", updated);
    setOptionData(updated);
  };

  return (
    <div className="p-4">
      <h1>Product Option Editor</h1>
      <ProductOption
        name={optionData.name}
        values={optionData.values}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default App;
