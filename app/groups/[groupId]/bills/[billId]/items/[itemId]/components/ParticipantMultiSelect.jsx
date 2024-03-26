import {Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export default ({label, participants, selected, onSelect}) => {
  const participantNames = {};
  participants.map((p) => {
    participantNames[p.id] = p.name;
  });

  const handleChange = (e) => {
    onSelect(e.target.value);
  }

  return (
    <FormControl sx={{ m: 1, width: '100%' }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
            {selected.map((value) =>
              <Chip key={value} label={participantNames[value]}></Chip>
            )}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {participants.map((p) =>
          <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
        )}
      </Select>
    </FormControl>
  )
}