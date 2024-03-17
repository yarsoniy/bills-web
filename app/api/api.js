export const api = {
  getAllGroups: async() => {
    const response = await fetch('/api/v1/participant_group');
    const data = await response.json();
    return data.data;
  },
  getGroup: async(groupId) => {
    const response = await fetch('/api/v1/participant_group/'+groupId);
    const data = await response.json();
    return data.data;
  },
  createGroup: async(title) => {
    const response = await fetch('/api/v1/participant_group/', {
      method: 'POST',
      body: JSON.stringify({title: title})
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
  },
  createParticipant: async(groupId, name) => {
    const response = await fetch('/api/v1/participant_group/'+groupId+'/participant', {
      method: 'POST',
      body: JSON.stringify({name: name})
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
  },
  createBill: async(groupId, title) => {
    const response = await fetch('/api/v1/participant_group/'+groupId+'/bill', {
      method: 'POST',
      body: JSON.stringify({title: title})
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
  },
  getBills: async(groupId) => {
    const response = await fetch('/api/v1/participant_group/' + groupId + '/bill');
    const data = await response.json();
    return data.data;
  },
  getBill: async(billId) => {
    const response = await fetch('/api/v1/bill/' + billId);
    const data = await response.json();
    return data.data;
  },
  createBillItem: async(billId, title, cost) => {
    const response = await fetch('/api/v1/bill/'+billId+'/item', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        cost: cost
      })
    });
    if (response.status !== 200) {
      throw new Error('Request failed');
    }
  }
}
