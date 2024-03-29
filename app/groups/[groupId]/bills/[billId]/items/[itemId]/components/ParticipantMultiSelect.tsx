import {Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import {Participant} from "@/app/api/types/group";

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

export default function ParticipantMultiSelect({label, participants, selected, onSelect}: {
  label: string,
  participants: Participant[],
  selected: string[],
  onSelect: (selected: string[]) => void,
}) {
  const participantNames: {[key: string]: string} = {};
  participants.map((p) => {
    participantNames[p.id] = p.name;
  });

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const {target: { value }} = e;
    const selected = typeof value === 'string' ? value.split(',') : value;
    onSelect(selected);
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