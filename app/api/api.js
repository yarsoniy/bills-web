const getAllGroups = async () => {
  const response = await fetch('/api/v1/participant_group');
  const data = await response.json();
  return data.data;
}

const getGroup = async (groupId) => {
  const response = await fetch('/api/v1/participant_group/'+groupId);
  const data = await response.json();
  return data.data;
}

const createGroup = async (title) => {
  const response = await fetch('/api/v1/participant_group/', {
    method: 'POST',
    body: JSON.stringify({title: title})
  });
  if (response.status !== 200) {
    throw new Error('Request failed');
  }
}

const createParticipant = async (groupId, name) => {
  const response = await fetch('/api/v1/participant_group/'+groupId+'/participant', {
    method: 'POST',
    body: JSON.stringify({name: name})
  });
  if (response.status !== 200) {
    throw new Error('Request failed');
  }
}

export const api = {getAllGroups, getGroup, createGroup, createParticipant};
